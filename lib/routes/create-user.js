"use strict";

//for validating
const joiValidate = require("../ValidateSchema/user");

module.exports = {
  method: "POST",
  path: "/users",
  options: {
    description: "create user's profile",
    tags: ["api"],
    validate: {
      payload: joiValidate.schema1,
    },
  },
  handler: async (request, h) => {
    try {
      const { User } = request.server.models();

      const data = await User.query().insert({
        username: request.payload.name,
        password: request.payload.password,
      });
      return data;
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },
};
