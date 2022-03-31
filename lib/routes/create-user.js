"use strict";

module.exports = {
  method: "POST",
  path: "/api/create-user",
  handler: async (request, h) => {
    try {
      const { User } = request.server.models();

      const data = await User.query().insert({
        username: request.payload.name,
        password: request.payload.password,
      });
      return {
        data,
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },
};
