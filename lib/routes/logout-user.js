"use strict";
const boom = require("@hapi/boom");

module.exports = {
  method: "POST",
  path: "/api/logout-user",
  handler: async (request, h) => {
    try {
      const { User } = request.server.models();
      const user_token = await User.query()
        .select("token")
        .where({
          username: request.payload.name,
        })
        .where({
          password: request.payload.password,
        });
      if (user_token == 0) {
        return h
          .response({
            message:
              "NOT A USER IN DATABASE GO AND SIGN UP OR WRONG CREDENTIALS!!",
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
      const remove = await User.query()
        .patch({
          token: null,
        })
        .where({
          token: user_token[0].token,
        });
      return {
        message: "SUCCESSFULLY LOGOUT !!",
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },
};
