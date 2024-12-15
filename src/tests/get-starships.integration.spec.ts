import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { expect } from "chai";
import { MockFactory } from "./shared/mock-factory";
import "mocha";
import { StarshipEntity } from "../app/features/starships/models/starship.entity";

describe("api/starships/ integration", () => {
  let mockFactory: MockFactory;
  let starshipEntities: StarshipEntity[];

  before(async () => {
    mockFactory = new MockFactory(global.container);
    starshipEntities = mockFactory.createStarships(5);
    await mockFactory.insertIntoDatabase();
  });

  after(async () => {
    await mockFactory.clearDatabase();
  });

  it("should get all starships", async () => {
    const response = await request(await global.container.cradle.server)
      .get("/api/starships?sort[id]=ASC")
      .expect(StatusCodes.OK);

    const { data } = response.body;
    expect(data).to.have.lengthOf(5);
    data.forEach((returnedEntity: StarshipEntity, index: number) => {
      expect(returnedEntity.id).to.be.deep.equal(starshipEntities[index].id);
      expect(returnedEntity.name).to.be.deep.equal(starshipEntities[index].name);
      expect(returnedEntity.model).to.be.deep.equal(starshipEntities[index].model);
    });
  });

  it("should get all starships with pagination", async () => {
    const response = await request(await global.container.cradle.server)
      .get("/api/starships?page=1&limit=2&sort[id]=ASC")
      .expect(StatusCodes.OK);

    const { data } = response.body;
    expect(data).to.have.lengthOf(2);
    data.forEach((returnedEntity: StarshipEntity, index: number) => {
      expect(returnedEntity.id).to.be.deep.equal(starshipEntities[index].id);
      expect(returnedEntity.name).to.be.deep.equal(starshipEntities[index].name);
      expect(returnedEntity.model).to.be.deep.equal(starshipEntities[index].model);
    });
  });

  it("should get all starships filtered by id", async () => {
    const response = await request(await global.container.cradle.server)
      .get("/api/starships?filter[id][gte]=3&sort[id]=ASC")
      .expect(StatusCodes.OK);

    const { data } = response.body;
    expect(data).to.have.lengthOf(2);
    data.forEach((returnedEntity: StarshipEntity, index: number) => {
      expect(returnedEntity.id).to.be.deep.equal(starshipEntities[index + 3].id);
      expect(returnedEntity.name).to.be.deep.equal(starshipEntities[index + 3].name);
      expect(returnedEntity.model).to.be.deep.equal(starshipEntities[index + 3].model);
    });
  });
});
