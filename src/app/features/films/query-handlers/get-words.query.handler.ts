import { QueryHandler } from "@tshio/query-bus";
import { Repository } from "typeorm";
import { GET_WORDS_QUERY_TYPE, GetWordsQuery, GetWordsQueryResult } from "../queries/get-words";
import { FilmEntity } from "../models/film.entity";
import { PeopleEntity } from "../../people/models/people.entity";

export interface GetWordsDependencies {
  filmRepository: Repository<FilmEntity>;
  peopleRepository: Repository<PeopleEntity>;
}

type UniqueWords = { [key: string]: number };

export default class GetWordsQueryHandler implements QueryHandler<GetWordsQuery, GetWordsQueryResult> {
  public queryType: string = GET_WORDS_QUERY_TYPE;

  constructor(private dependencies: GetWordsDependencies) {}

  async execute(): Promise<GetWordsQueryResult> {
    const allOpenings = await this.dependencies.filmRepository
      .createQueryBuilder("films")
      .select("opening_crawl")
      .getRawMany();

    const combinedOpenings = allOpenings
      .map((opening) => opening.opening_crawl)
      .join(" ")
      .replace(/’s\b/g, "")
      .replace(/[^\w\s]/g, "")
      .toLowerCase();

    const uniqueWords = this.countUniqueWords(combinedOpenings);
    const mostMentioned = await this.getMostMentioned(combinedOpenings);
    return new GetWordsQueryResult({ uniqueWords, mostMentioned });
  }

  private countUniqueWords(combinedOpenings: string): UniqueWords {
    const uniqueWords: UniqueWords = {};

    const allWords = combinedOpenings.split(/\s+/).filter((word) => word.trim().length > 0);

    allWords.forEach((word) => {
      if (uniqueWords[word]) {
        uniqueWords[word] += 1;
      } else {
        uniqueWords[word] = 1;
      }
    });

    return uniqueWords;
  }

  private async getMostMentioned(combinedOpenings: string) {
    const personNames = await this.dependencies.peopleRepository.find({
      select: {
        name: true,
      },
    });

    const namesWithCount: { name: string; matchCount: number }[] = [];

    personNames.forEach(({ name }) => {
      const nameRegex = new RegExp(`\\b${name.replace(/\s+/g, " ").toLowerCase()}\\b`, "g");

      const matchCount = (combinedOpenings.match(nameRegex) || []).length;

      if (matchCount > 0) {
        namesWithCount.push({ name, matchCount });
      }
    });

    const maxMatchCount = Math.max(...namesWithCount.map(({ matchCount }) => matchCount));

    const mostMentioned = namesWithCount
      .filter(({ matchCount }) => matchCount === maxMatchCount)
      .map(({ name }) => name);

    return mostMentioned.length === 1 ? mostMentioned[0] : mostMentioned;
  }
}
