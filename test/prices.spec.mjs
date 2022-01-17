import { createApp } from "../src/prices.mjs";
import { InMemoryDatabase } from "../src/database.mjs";
import request from "supertest";
import { expect } from "chai";

describe("prices", function () {
  this.retries(2);
  this.timeout(2000);
  let app;

  beforeEach(async () => {
    app = createApp(new InMemoryDatabase().withTestData());
    await request(app).put("/prices?type=1jour&cost=35").expect(200);
    await request(app).put("/prices?type=night&cost=19").expect(200);
  });

  it("default cost", async () => {
    const { body } = await request(app).get("/prices?type=1jour");

    expect(body.cost).equal(35);
  });

  [
    { age: 5, expectedCost: 0 },
    { age: 6, expectedCost: 25 },
    { age: 14, expectedCost: 25 },
    { age: 15, expectedCost: 35 },
    { age: 25, expectedCost: 35 },
    { age: 64, expectedCost: 35 },
    { age: 65, expectedCost: 27 },
  ].forEach(({ age, expectedCost }) => {
    it("works for all ages", async () => {
      const { body } = await request(app).get(`/prices?type=1jour&age=${age}`);

      expect(body.cost).equal(expectedCost);
    });
  });

  it("default night cost", async () => {
    const { body } = await request(app).get("/prices?type=night");

    expect(body.cost).equal(0);
  });

  [
    { age: 5, expectedCost: 0 },
    { age: 6, expectedCost: 19 },
    { age: 25, expectedCost: 19 },
    { age: 64, expectedCost: 19 },
    { age: 65, expectedCost: 8 },
  ].forEach(({ age, expectedCost }) => {
    it("works for night passes", async () => {
      const { body } = await request(app).get(`/prices?type=night&age=${age}`);

      expect(body.cost).equal(expectedCost);
    });
  });

  [
    { age: 15, expectedCost: 35, date: "2019-02-22" },
    { age: 15, expectedCost: 35, date: "2019-02-25" },
    { age: 15, expectedCost: 23, date: "2019-03-11" },
    { age: 65, expectedCost: 18, date: "2019-03-11" }, // monday
  ].forEach(({ age, expectedCost, date }) => {
    it("works for monday deals", async () => {
      const { body } = await request(app).get(
        `/prices?type=1jour&age=${age}&date=${date}`
      );

      expect(body.cost).equal(expectedCost);
    });
  });

  // TODO 2-4, and 5, 6 day pass
});
