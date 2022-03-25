"use strict";

module.exports = {
  method: "GET",
  path: "/fetch-user",
  handler: async (request) => {
    const { User } = request.server.models();
    const data = await User.query();
    return {
      data,
      message: "SUCCESS",
    };
  },
};
