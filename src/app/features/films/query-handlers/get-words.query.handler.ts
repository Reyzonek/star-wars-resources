import { QueryHandler } from "@tshio/query-bus";
import { Repository } from "typeorm";
import { GET_WORDS_QUERY_TYPE, GetWordsQuery, GetWordsQueryResult } from "../queries/get-words";
import { FilmEntity } from "../models/film.entity";

export interface GetWordsDependencies {
  filmRepository: Repository<FilmEntity>;
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

    const uniqueWords = this.countUniqueWords(allOpenings);

    return new GetWordsQueryResult({ uniqueWords });
  }

  private countUniqueWords(openings: FilmEntity[]): UniqueWords {
    const combinedOpenings = openings.map((opening) => opening.opening_crawl).join(" ");

    const uniqueWords: UniqueWords = {};

    const allWords = combinedOpenings
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((word) => word.trim().length > 0)
      .map((word) => word.toLocaleLowerCase());

    allWords.forEach((word) => {
      if (uniqueWords[word]) {
        uniqueWords[word] += 1;
      } else {
        uniqueWords[word] = 1;
      }
    });

    return uniqueWords;
  }
}
