import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { expect } from "chai";
import { MockFactory } from "./shared/mock-factory";
import "mocha";
import { StarshipEntity } from "../app/features/starships/models/starship.entity";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";
import { SwapiResource } from "../shared/constants/swapi-resource.enum";

describe("api/starships/:id integration", () => {
  let mockFactory: MockFactory;
  let starshipEntities: StarshipEntity[];

  before(async () => {
    mockFactory = new MockFactory(global.container);
    starshipEntities = mockFactory.createStarships(2);
    await mockFactory.insertIntoDatabase();
  });

  after(async () => {
    await mockFactory.clearDatabase();
  });

  it("should get starship details", async () => {
    const starshipId = 1;
    const response = await request(await global.container.cradle.server)
      .get(`/api/starships/${starshipId}`)
      .expect(StatusCodes.OK);

    const { starship } = response.body;
    expect(starship.id).to.be.deep.equal(starshipId);
    expect(starship.name).to.be.deep.equal(starshipEntities[starshipId].name);
    expect(starship.model).to.be.deep.equal(starshipEntities[starshipId].model);
  });

  it("should return error when starship was not found", async () => {
    const invalidStarshipId = 4;
    const response = await request(await global.container.cradle.server)
      .get(`/api/starships/${invalidStarshipId}`)
      .expect(StatusCodes.NOT_FOUND);

    const { error } = response.body;

    expect(error.message).to.be.equal(new ResourceNotFoundError(SwapiResource.STARSHIPS, invalidStarshipId).message);
  });
});
