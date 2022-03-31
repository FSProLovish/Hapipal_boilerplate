"use strict";

module.exports = {
  method: "GET",
  path: "/api/fetch-user",
  handler: async (request) => {
    try {
      const { User } = request.server.models();
      const data = await User.query();
      return {
        data,
        message: "SUCCESS",
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },
};
