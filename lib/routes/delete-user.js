"use strict";

module.exports = {
  method: "DELETE",
  path: "/api/delete-user",
  handler: async (request, h) => {
    try {
      const { User } = request.server.models();
      const user_token = await User.query()
        .select("token")
        .where({ username: request.payload.name })
        .where({ password: request.payload.password });

      if (user_token.length == 0) {
        return h
          .response({
            message: "SIGN UP OR WRONG CREDENTIALS",
          })
          .code(404);
      }
      if (user_token[0].token == null) {
        return h
          .response({
            message: "YOU MUST HAVE TO SIGN IN",
          })
          .code(401);
      }
      const user_delete = await User.query().delete().where({
        token: user_token[0].token,
      });

      return {
        message: "DELETED SUCCESSFULLY",
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },
};
