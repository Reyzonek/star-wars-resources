import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { expect } from "chai";
import { MockFactory } from "./shared/mock-factory";
import "mocha";
import { FilmEntity } from "../app/features/films/models/film.entity";

describe("api/films/ integration", () => {
  let mockFactory: MockFactory;
  let filmEntities: FilmEntity[];

  before(async () => {
    mockFactory = new MockFactory(global.container);
    filmEntities = mockFactory.createFilms(5);
    await mockFactory.insertIntoDatabase();
  });

  after(async () => {
    await mockFactory.clearDatabase();
  });

  it("should get all films", async () => {
    const response = await request(await global.container.cradle.server)
      .get("/api/films?sort[id]=ASC")
      .expect(StatusCodes.OK);

    const { data } = response.body;
    expect(data).to.have.lengthOf(5);
    data.forEach((returnedEntity: FilmEntity, index: number) => {
      expect(returnedEntity.id).to.be.deep.equal(filmEntities[index].id);
      expect(returnedEntity.title).to.be.deep.equal(filmEntities[index].title);
      expect(returnedEntity.episode_id).to.be.deep.equal(filmEntities[index].episode_id);
    });
  });

  it("should get all films with pagination", async () => {
    const response = await request(await global.container.cradle.server)
      .get("/api/films?page=1&limit=2&sort[id]=ASC")
      .expect(StatusCodes.OK);

    const { data } = response.body;
    expect(data).to.have.lengthOf(2);
    data.forEach((returnedEntity: FilmEntity, index: number) => {
      expect(returnedEntity.id).to.be.deep.equal(filmEntities[index].id);
      expect(returnedEntity.title).to.be.deep.equal(filmEntities[index].title);
      expect(returnedEntity.episode_id).to.be.deep.equal(filmEntities[index].episode_id);
    });
  });

  it("should get all films filtered by episode_id", async () => {
    const response = await request(await global.container.cradle.server)
      .get("/api/films?filter[episode_id][gte]=3&sort[id]=ASC")
      .expect(StatusCodes.OK);

    const { data } = response.body;
    expect(data).to.have.lengthOf(2);
    data.forEach((returnedEntity: FilmEntity, index: number) => {
      expect(returnedEntity.id).to.be.deep.equal(filmEntities[3 + index].id);
      expect(returnedEntity.title).to.be.deep.equal(filmEntities[3 + index].title);
      expect(returnedEntity.episode_id).to.be.deep.equal(filmEntities[3 + index].episode_id);
    });
  });
});
