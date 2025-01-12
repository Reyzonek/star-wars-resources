import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { expect } from "chai";
import { MockFactory } from "./shared/mock-factory";
import "mocha";
import { PlanetAlreadyExistsError } from "../errors/planet-already-exists.error";

describe("api/planets/planet integration", () => {
  let mockFactory: MockFactory;
  const baseRequestBody = {
    orbital_period: "304",
    diameter: "10465",
    climate: "arid",
    gravity: "1 standard",
    terrain: "desert",
    surface_water: "1",
    population: "200000",
    residents: ["Luke Skywalker", "Anakin Skywalker"],
    films: ["A New Hope", "The Phantom Menace"],
  };

  before(async () => {
    mockFactory = new MockFactory(global.container);
    mockFactory.createPlanets(1);
    await mockFactory.insertIntoDatabase();
  });

  after(async () => {
    await mockFactory.clearDatabase();
  });

  it("should throw error when planet alrady exists", async () => {
    const response = await request(await global.container.cradle.server)
      .post("/api/planets/planet")
      .send({
        name: "Name 0",
        ...baseRequestBody,
      })
      .expect(StatusCodes.CONFLICT);

    const { error } = response.body;
    expect(response.status).to.equal(StatusCodes.CONFLICT);
    expect(error.message).to.be.deep.equal(new PlanetAlreadyExistsError("Name 0").message);
  });

  it("should post planet", async () => {
    const name = "Some planet name";

    const response = await request(await global.container.cradle.server)
      .post("/api/planets/planet")
      .send({
        name,
        ...baseRequestBody,
      })
      .expect(StatusCodes.CREATED);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, ...responseBody } = response.body;

    expect(responseBody).to.be.deep.equal({
      id: 1000,
      name,
      created: null,
      edited: null,
      url: null,
      ...baseRequestBody,
    });
  });
});
