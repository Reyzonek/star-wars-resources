import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { expect } from "chai";
import { MockFactory } from "./shared/mock-factory";
import "mocha";
import { SpeciesEntity } from "../app/features/species/models/species.entity";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";
import { SwapiResource } from "../shared/constants/swapi-resource.enum";

describe("api/species/:id integration", () => {
  let mockFactory: MockFactory;
  let speciesEntities: SpeciesEntity[];

  before(async () => {
    mockFactory = new MockFactory(global.container);
    speciesEntities = mockFactory.createSpecies(2);
    await mockFactory.insertIntoDatabase();
  });

  after(async () => {
    await mockFactory.clearDatabase();
  });

  it("should get species details", async () => {
    const speciesId = 1;
    const response = await request(await global.container.cradle.server)
      .get(`/api/species/${speciesId}`)
      .expect(StatusCodes.OK);

    const { species } = response.body;
    expect(species.id).to.be.deep.equal(speciesId);
    expect(species.name).to.be.deep.equal(speciesEntities[speciesId].name);
    expect(species.classification).to.be.deep.equal(speciesEntities[speciesId].classification);
  });

  it("should return error when species was not found", async () => {
    const invalidSpeciesId = 4;
    const response = await request(await global.container.cradle.server)
      .get(`/api/species/${invalidSpeciesId}`)
      .expect(StatusCodes.NOT_FOUND);

    const { error } = response.body;

    expect(error.message).to.be.equal(new ResourceNotFoundError(SwapiResource.SPECIES, invalidSpeciesId).message);
  });
});
