import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { expect } from "chai";
import { MockFactory } from "./shared/mock-factory";
import "mocha";
import { PlanetEntity } from "../app/features/planets/models/planet.entity";

describe("api/planets/ integration", () => {
  let mockFactory: MockFactory;
  let planetEntities: PlanetEntity[];

  before(async () => {
    mockFactory = new MockFactory(global.container);
    planetEntities = mockFactory.createPlanets(5);
    await mockFactory.insertIntoDatabase();
  });

  after(async () => {
    await mockFactory.clearDatabase();
  });

  it("should get all planets", async () => {
    const response = await request(await global.container.cradle.server)
      .get("/api/planets?sort[id]=ASC")
      .expect(StatusCodes.OK);

    const { data } = response.body;
    expect(data).to.have.lengthOf(5);
    data.forEach((returnedEntity: PlanetEntity, index: number) => {
      expect(returnedEntity.id).to.be.deep.equal(planetEntities[index].id);
      expect(returnedEntity.name).to.be.deep.equal(planetEntities[index].name);
      expect(returnedEntity.diameter).to.be.deep.equal(planetEntities[index].diameter);
    });
  });

  it("should get all planets with pagination", async () => {
    const response = await request(await global.container.cradle.server)
      .get("/api/planets?page=1&limit=2&sort[id]=ASC")
      .expect(StatusCodes.OK);

    const { data } = response.body;
    expect(data).to.have.lengthOf(2);
    data.forEach((returnedEntity: PlanetEntity, index: number) => {
      expect(returnedEntity.id).to.be.deep.equal(planetEntities[index].id);
      expect(returnedEntity.name).to.be.deep.equal(planetEntities[index].name);
      expect(returnedEntity.diameter).to.be.deep.equal(planetEntities[index].diameter);
    });
  });

  it("should get all planets filtered by id", async () => {
    const response = await request(await global.container.cradle.server)
      .get("/api/planets?filter[id][gte]=3&sort[id]=ASC")
      .expect(StatusCodes.OK);

    const { data } = response.body;
    expect(data).to.have.lengthOf(2);
    data.forEach((returnedEntity: PlanetEntity, index: number) => {
      expect(returnedEntity.id).to.be.deep.equal(planetEntities[index + 3].id);
      expect(returnedEntity.name).to.be.deep.equal(planetEntities[index + 3].name);
      expect(returnedEntity.diameter).to.be.deep.equal(planetEntities[index + 3].diameter);
    });
  });
});
