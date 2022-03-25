"use strict";

// const User = require("../models/users");

module.exports = {
  method: "POST",
  path: "/create-user",
  handler: async (request, h) => {
    const { User } = request.server.models();
    // const result = await User.validate(request.payload);

    const data = await User.query().insert({
      username: request.payload.name,
      password: request.payload.password,
    });
    return data;
  },
};
