import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { expect } from "chai";
import { MockFactory } from "./shared/mock-factory";
import "mocha";
import { VehicleEntity } from "../app/features/vehicles/models/vehicle.entity";

describe("api/vehicles/ integration", () => {
  let mockFactory: MockFactory;
  let vehicleEntities: VehicleEntity[];

  before(async () => {
    mockFactory = new MockFactory(global.container);
    vehicleEntities = mockFactory.createVehicles(5);
    await mockFactory.insertIntoDatabase();
  });

  after(async () => {
    await mockFactory.clearDatabase();
  });

  it("should get all vehicles", async () => {
    const response = await request(await global.container.cradle.server)
      .get("/api/vehicles?sort[id]=ASC")
      .expect(StatusCodes.OK);

    const { data } = response.body;
    expect(data).to.have.lengthOf(5);
    data.forEach((returnedEntity: VehicleEntity, index: number) => {
      expect(returnedEntity.id).to.be.deep.equal(vehicleEntities[index].id);
      expect(returnedEntity.name).to.be.deep.equal(vehicleEntities[index].name);
      expect(returnedEntity.model).to.be.deep.equal(vehicleEntities[index].model);
    });
  });

  it("should get all vehicles with pagination", async () => {
    const response = await request(await global.container.cradle.server)
      .get("/api/vehicles?page=1&limit=2&sort[id]=ASC")
      .expect(StatusCodes.OK);

    const { data } = response.body;
    expect(data).to.have.lengthOf(2);
    data.forEach((returnedEntity: VehicleEntity, index: number) => {
      expect(returnedEntity.id).to.be.deep.equal(vehicleEntities[index].id);
      expect(returnedEntity.name).to.be.deep.equal(vehicleEntities[index].name);
      expect(returnedEntity.model).to.be.deep.equal(vehicleEntities[index].model);
    });
  });

  it("should get all vehicles filtered by id", async () => {
    const response = await request(await global.container.cradle.server)
      .get("/api/vehicles?filter[id][gte]=3&sort[id]=ASC")
      .expect(StatusCodes.OK);

    const { data } = response.body;
    expect(data).to.have.lengthOf(2);
    data.forEach((returnedEntity: VehicleEntity, index: number) => {
      expect(returnedEntity.id).to.be.deep.equal(vehicleEntities[index + 3].id);
      expect(returnedEntity.name).to.be.deep.equal(vehicleEntities[index + 3].name);
      expect(returnedEntity.model).to.be.deep.equal(vehicleEntities[index + 3].model);
    });
  });
});
