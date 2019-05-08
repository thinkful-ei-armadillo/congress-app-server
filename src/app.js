"use strict";
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const cron = require("node-cron");
const membersRouter = require("./members/members-router");
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const billsRouter = require("./bills/bills-router");
const top3sRouter = require("./top3s/top3s-router");
const committeesRouter = require("./committees/committees-router");
const MembersService = require("./members/members-service");
const BillsService = require("./bills/bills-service");
const CommitteesService = require("./committees/committees-service");
const app = express();

require("run-middleware")(app);

app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => NODE_ENV === "test"
  })
);
app.use(cors());
app.use(helmet());

app.use("/api/members", membersRouter);
app.use("/api/bills", billsRouter);
app.use("/api/top3s", top3sRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/committees", committeesRouter);

//members seed (should be once a month)
// cron.schedule("* * * * */1 ", () => {
//   MembersService.seedMembers(app.get("db"));
// });

//bills seed, should be daily
// cron.schedule("* * * * */1 ", () => {
//   BillsService.seedBills(app.get("db"));
// });

// //committees seed, should be (unknown period)
// cron.schedule("* * * * */1 ", () => {
//   CommitteesService.seedCommittees(app.get("db"));
// });

// 4/24 "cannot read property pipescount of undefined"
// let refreshMembers = cron.schedule('*/1 * * * *', () => {
//   console.log('cron running');

//   app.runMiddleware('/api/members/seedMembers', function(code, body, headers) {
//     console.log('members response', body);
//   });
// });

// refreshMembers.start();

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: "Server error" };
  } else {
    console.error(error);
    response = { error: error.message, object: error };
  }
  res.status(500).json(response);
});

module.exports = app;
