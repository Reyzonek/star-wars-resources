import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { expect } from "chai";
import { MockFactory } from "./shared/mock-factory";
import "mocha";
import { PlanetEntity } from "../app/features/planets/models/planet.entity";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";
import { SwapiResource } from "../shared/constants/swapi-resource.enum";

describe("api/planets/:id integration", () => {
  let mockFactory: MockFactory;
  let planetEntities: PlanetEntity[];

  before(async () => {
    mockFactory = new MockFactory(global.container);
    planetEntities = mockFactory.createPlanets(2);
    await mockFactory.insertIntoDatabase();
  });

  after(async () => {
    await mockFactory.clearDatabase();
  });

  it("should get planet details", async () => {
    const planetId = 1;
    const response = await request(await global.container.cradle.server)
      .get(`/api/planets/${planetId}`)
      .expect(StatusCodes.OK);

    const { planet } = response.body;
    expect(planet.id).to.be.deep.equal(planetId);
    expect(planet.name).to.be.deep.equal(planetEntities[planetId].name);
    expect(planet.diameter).to.be.deep.equal(planetEntities[planetId].diameter);
  });

  it("should return error when planet was not found", async () => {
    const invalidPlaneId = 4;
    const response = await request(await global.container.cradle.server)
      .get(`/api/planets/${invalidPlaneId}`)
      .expect(StatusCodes.NOT_FOUND);

    const { error } = response.body;

    expect(error.message).to.be.equal(new ResourceNotFoundError(SwapiResource.PLANETS, invalidPlaneId).message);
  });
});
