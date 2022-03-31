"use strict";

const JWT = require("jsonwebtoken");
const secret = "NeverShareYourSecret";
const people = {
  1: {
    id: 1,
    name: "Anthony Valid User",
  },
  2: {
    id: 2,
    name: "Antonomo Invalid User",
  },
};
const token = JWT.sign(people[1], secret);
const token2 = JWT.sign(people[2], secret);

module.exports = {
  method: "GET",
  path: "/api/jwt-user",
  handler: (request, h) => {
    return h
      .response({
        token,
        token2,
      })
      .code(200);
  },
};
