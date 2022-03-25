"use strict";

module.exports = {
  method: "POST",
  path: "/update-user",
  handler: async (request) => {
    const { User } = request.server.models();
    const userUpdate = await User.query()
      .patch({
        username: request.payload.name,
      })
      .where({ password: request.payload.password });

    return {
      userUpdate,
      message: "UPDATED SUCCESSFULLY",
    };
  },
};
