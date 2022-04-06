"use strict";

module.exports = {
  method: "GET",
  path: "/users",
  handler: async (request) => {
    try {
      const { User } = request.server.models();
      const data = await User.query();
      return data;
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },
};
