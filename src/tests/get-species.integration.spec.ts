import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { expect } from "chai";
import { MockFactory } from "./shared/mock-factory";
import "mocha";
import { SpeciesEntity } from "../app/features/species/models/species.entity";

describe("api/species/ integration", () => {
  let mockFactory: MockFactory;
  let speciesEntities: SpeciesEntity[];

  before(async () => {
    mockFactory = new MockFactory(global.container);
    speciesEntities = mockFactory.createSpecies(5);
    await mockFactory.insertIntoDatabase();
  });

  after(async () => {
    await mockFactory.clearDatabase();
  });

  it("should get all species", async () => {
    const response = await request(await global.container.cradle.server)
      .get("/api/species?sort[id]=ASC")
      .expect(StatusCodes.OK);

    const { data } = response.body;
    expect(data).to.have.lengthOf(5);
    data.forEach((returnedEntity: SpeciesEntity, index: number) => {
      expect(returnedEntity.id).to.be.deep.equal(speciesEntities[index].id);
      expect(returnedEntity.name).to.be.deep.equal(speciesEntities[index].name);
      expect(returnedEntity.classification).to.be.deep.equal(speciesEntities[index].classification);
    });
  });

  it("should get all species with pagination", async () => {
    const response = await request(await global.container.cradle.server)
      .get("/api/species?page=1&limit=2&sort[id]=ASC")
      .expect(StatusCodes.OK);

    const { data } = response.body;
    expect(data).to.have.lengthOf(2);
    data.forEach((returnedEntity: SpeciesEntity, index: number) => {
      expect(returnedEntity.id).to.be.deep.equal(speciesEntities[index].id);
      expect(returnedEntity.name).to.be.deep.equal(speciesEntities[index].name);
      expect(returnedEntity.classification).to.be.deep.equal(speciesEntities[index].classification);
    });
  });

  it("should get all species filtered by id", async () => {
    const response = await request(await global.container.cradle.server)
      .get("/api/species?filter[id][gte]=3&sort[id]=ASC")
      .expect(StatusCodes.OK);

    const { data } = response.body;
    expect(data).to.have.lengthOf(2);
    data.forEach((returnedEntity: SpeciesEntity, index: number) => {
      expect(returnedEntity.id).to.be.deep.equal(speciesEntities[index + 3].id);
      expect(returnedEntity.name).to.be.deep.equal(speciesEntities[index + 3].name);
      expect(returnedEntity.classification).to.be.deep.equal(speciesEntities[index + 3].classification);
    });
  });
});
