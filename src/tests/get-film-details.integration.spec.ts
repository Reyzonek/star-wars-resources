import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { expect } from "chai";
import { MockFactory } from "./shared/mock-factory";
import "mocha";
import { FilmEntity } from "../app/features/films/models/film.entity";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";
import { SwapiResource } from "../shared/constants/swapi-resource.enum";

describe("api/films/:id integration", () => {
  let mockFactory: MockFactory;
  let filmEntities: FilmEntity[];

  before(async () => {
    mockFactory = new MockFactory(global.container);
    filmEntities = mockFactory.createFilms(2);
    await mockFactory.insertIntoDatabase();
  });

  after(async () => {
    await mockFactory.clearDatabase();
  });

  it("should get film details", async () => {
    const filmId = 1;
    const response = await request(await global.container.cradle.server)
      .get(`/api/films/${filmId}`)
      .expect(StatusCodes.OK);

    const { film } = response.body;
    expect(film.id).to.be.deep.equal(filmId);
    expect(film.title).to.be.deep.equal(filmEntities[filmId].title);
    expect(film.episode_id).to.be.deep.equal(filmEntities[filmId].episode_id);
  });

  it("should return error when film not found", async () => {
    const invalidFilmId = 4;
    const response = await request(await global.container.cradle.server)
      .get(`/api/films/${invalidFilmId}`)
      .expect(StatusCodes.NOT_FOUND);

    const { error } = response.body;

    expect(error.message).to.be.equal(new ResourceNotFoundError(SwapiResource.FILMS, invalidFilmId).message);
  });
});
