import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { expect } from "chai";
import { MockFactory } from "./shared/mock-factory";
import "mocha";
import { VehicleEntity } from "../app/features/vehicles/models/vehicle.entity";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";
import { SwapiResource } from "../shared/constants/swapi-resource.enum";

describe("api/vehicles/:id integration", () => {
  let mockFactory: MockFactory;
  let vehicleEntities: VehicleEntity[];

  before(async () => {
    mockFactory = new MockFactory(global.container);
    vehicleEntities = mockFactory.createVehicles(2);
    await mockFactory.insertIntoDatabase();
  });

  after(async () => {
    await mockFactory.clearDatabase();
  });

  it("should get vehicle details", async () => {
    const vehicleId = 1;
    const response = await request(await global.container.cradle.server)
      .get(`/api/vehicles/${vehicleId}`)
      .expect(StatusCodes.OK);

    const { vehicle } = response.body;
    expect(vehicle.id).to.be.deep.equal(vehicleId);
    expect(vehicle.name).to.be.deep.equal(vehicleEntities[vehicleId].name);
    expect(vehicle.model).to.be.deep.equal(vehicleEntities[vehicleId].model);
  });

  it("should return error when vehicle was not found", async () => {
    const invalidVehicleId = 4;
    const response = await request(await global.container.cradle.server)
      .get(`/api/vehicles/${invalidVehicleId}`)
      .expect(StatusCodes.NOT_FOUND);

    const { error } = response.body;

    expect(error.message).to.be.equal(new ResourceNotFoundError(SwapiResource.VEHICLES, invalidVehicleId).message);
  });
});
