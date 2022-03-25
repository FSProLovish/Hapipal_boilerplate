"use strict";

module.exports = {
  method: "POST",
  path: "/delete-user",
  handler: async (request) => {
    const { User } = request.server.models();
    const userDelete = await User.query()
      .delete()
      .where({ password: request.payload.password });

    return {
      userDelete,
      message: "DELETED SUCCESSFULLY",
    };
  },
};
