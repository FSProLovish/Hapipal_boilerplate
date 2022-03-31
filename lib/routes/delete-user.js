"use strict";

module.exports = {
  method: "DELETE",
  path: "/api/delete-user",
  handler: async (request) => {
    try {
      const { User } = request.server.models();
      const user_token = await User.query()
        .select("token")
        .where({ username: request.payload.name })
        .where({ password: request.payload.password });

      if (user_token.length == 0 || user_token[0].token == null) {
        return {
          message: "USER IS NOT AUTHENTICATED OR WRONG CREDENTIALS",
        };
      }
      const user_delete = await User.query().delete().where({
        token: user_token[0].token,
      });

      return {
        user_delete,
        message: "DELETED SUCCESSFULLY",
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },
};
