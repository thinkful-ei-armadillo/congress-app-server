"use strict";
const app = require("../src/app");
const helpers = require("./test-helpers");
const knex = require("knex");
const { expect } = require("chai");
const supertest = require("supertest");

describe.only("Members Router Endpoints", () => {
  let db;

  // const { testMembers } = helpers.makeCongressFixtures();
  // const testMember = testMembers[0];
  console.log(process.env.TEST_DB_URL);
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe("GET /search", () => {
    context("Given there are no congress members in the database", () => {
      it("responds with 404", () => {
        return supertest(app)
          .get("/api/members/search")
          .expect(res.body)
          .to.equal([])
          .expect(res.status)
          .to.equal(200);
      });
    });

    context("Given there are congress members in the database", () => {
      // beforeEach('insert members', () =>
      //   helpers.makeCongressFixtures(db, testMembers)
      // )
      it("responds with all the congress members", () => {
        const expectedResults = helpers.makeCongressFixtures();
        const expectedMembers = expectedResults.testMembers;
        console.log(expectedMembers);
        return supertest(app)
          .get("api/members/search")
          .expect(expectedMembers);
      });
    });

    it.skip("responds with congress member with id of 1", () => {
      // Empty Search

      return supertest(app)
        .get("/api/members/1")
        .expect();
    });

    it.skip("responds with specific congressman by name", () => {
      // Valid Search
      const expectedSearch = "searchTerm";
      return supertest(app)
        .get("/api/members/search")
        .send(expectedSearch)
        .expect({ STATUSCODE }, { error: errorMessage });
    });

    it.skip("responds with no congressman", () => {
      // Invalid Search
      const expectedSearch = "searchTerm";
      return supertest(app)
        .get("/api/members/search")
        .send(expectedSearch)
        .expect({ STATUSCODE }, { error: errorMessage });
    });
  });

  describe("GET /:id", () => {
    it.skip("responds with no congressman by empty id", () => {
      // Empty Search
      const expectedId = "";
      return supertest(app)
        .get(`/api/members/${expectedId}`)
        .expect({ STATUSCODE }, { error: errorMessage });
    });
    it.skip("responds with no congressman with specific id", () => {
      // Invalid Search
      const expectedId = "12345";
      return supertest(app)
        .get(`/api/members/${expectedId}`)
        .expect({ STATUSCODE }, { error: errorMessage });
    });
    it.skip("responds with congressman with real id", () => {
      // Valid Search
      const expectedId = ""; // use real id
      return supertest(app)
        .get(`/api/members/${expectedId}`)
        .expect({ STATUSCODE });
    });
  });
});
