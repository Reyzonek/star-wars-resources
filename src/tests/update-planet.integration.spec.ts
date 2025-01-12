import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { expect } from "chai";
import { MockFactory } from "./shared/mock-factory";
import "mocha";
import { PlanetAlreadyExistsError } from "../errors/planet-already-exists.error";
import { PlanetNotFoundError } from "../errors/planet-not-found.error";
import { PlanetEntity } from "../app/features/planets/models/planet.entity";

describe("PATCH api/planets/:id integration", () => {
  let mockFactory: MockFactory;
  const baseRequestBody = {
    orbital_period: "500",
    diameter: "123123",
    climate: "desert",
    gravity: "2 standard",
  };
  let planets: PlanetEntity[];

  before(async () => {
    mockFactory = new MockFactory(global.container);
    planets = mockFactory.createPlanets(2);
    await mockFactory.insertIntoDatabase();
  });

  after(async () => {
    await mockFactory.clearDatabase();
  });

  it("should throw error when planet alrady exists", async () => {
    const id = 1;

    const response = await request(await global.container.cradle.server)
      .patch(`/api/planets/${id}`)
      .send({
        name: "Name 0",
        ...baseRequestBody,
      })
      .expect(StatusCodes.CONFLICT);

    const { error } = response.body;
    expect(response.status).to.equal(StatusCodes.CONFLICT);
    expect(error.message).to.be.deep.equal(new PlanetAlreadyExistsError("Name 0").message);
  });

  it("should throw error when planet was not found", async () => {
    const id = 100;

    const response = await request(await global.container.cradle.server)
      .patch(`/api/planets/${id}`)
      .send(baseRequestBody)
      .expect(StatusCodes.NOT_FOUND);

    const { error } = response.body;
    expect(response.status).to.equal(StatusCodes.NOT_FOUND);
    expect(error.message).to.be.deep.equal(new PlanetNotFoundError(id).message);
  });

  it("should update planet", async () => {
    const name = "Some new planet name";
    const id = 1;

    await request(await global.container.cradle.server)
      .patch(`/api/planets/${id}`)
      .send({
        name,
        ...baseRequestBody,
      })
      .expect(StatusCodes.OK);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { updatedAt, ...planetAfterUpdate } = await global.container.cradle.planetRepository.findOne({
      where: { id },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { updatedAt: planetUpdatedAt, ...planet } = planets[1];

    expect(planetAfterUpdate).to.be.deep.equal({
      ...planet,
      name,
      ...baseRequestBody,
    });
  });
});
