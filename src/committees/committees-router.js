"use strict";
const express = require("express");
const requestPromise = require("request-promise");
const CommitteesService = require("./committees-service");
const { PROPUBLICA_API, PROPUBLICA_APIKEY } = require("../config");

const committeesRouter = express.Router();

//getall route

committeesRouter.route("/").get((req, res, next) => {
  CommittessService.getAllCommittess(req.app.get("db"))
    .then(committees => {
      return res.json(CommitteesService.serializeCommittees(committees));
    })
    .catch(next);
});

// seeding the committees in db
committeesRouter.route("/seedCommittees").get(async (req, res, next) => {
  console.log("hello from seedCommittees route!");
  try {
    await Promise.all([
      requestPromise({
        method: "GET",
        uri: `${PROPUBLICA_API}/116/senate/committees.json`,
        json: true,
        headers: {
          "X-API-Key": PROPUBLICA_APIKEY
        },
        rejectUnauthorized: false
      }).then(data => {
        if (!data) {
          const message = "No Data";
          console.error(message);
          return res.status(404).send(message);
        }

        return data.results[0].committees;
      }),
      requestPromise({
        method: "GET",
        uri: `${PROPUBLICA_API}/116/house/committees.json`,
        json: true,
        headers: {
          "X-API-Key": PROPUBLICA_APIKEY
        },
        rejectUnauthorized: false
      }).then(data => {
        if (!data) {
          const message = "No Data";
          console.error(message);
          return res.status(404).send(message);
        }
        return data.results[0].committees;
      }),
      requestPromise({
        method: "GET",
        uri: `${PROPUBLICA_API}/116/joint/committees.json`,
        json: true,
        headers: {
          "X-API-Key": PROPUBLICA_APIKEY
        },
        rejectUnauthorized: false
      }).then(data => {
        if (!data) {
          const message = "No Data";
          console.error(message);
          return res.status(404).send(message);
        }
        return data.results[0].committees;
      })
    ]).then(data => {
      CommitteesService.updateCommittees(req.app.get("db"), [...data[0], ...data[1], ...data[2]]).then(
        result => {
          res.sendStatus(200);
        }
      );
    });
  } catch (e) {
    next(e);
  }
});

module.exports = committeesRouter;
