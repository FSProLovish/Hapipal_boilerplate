"use strict";

const jwt = require("jsonwebtoken");
const secret = "NeverShareYourkey";

module.exports = {
  method: "POST",
  path: "/api/update-user",
  handler: async (request) => {
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

      const verify = jwt.decode(user_token[0].token, secret);
      console.log(verify);

      const userUpdate = await User.query()
        .patch({
          username: request.payload.new,
        })
        .where({ password: verify.password });

      return {
        message: "UPDATED SUCCESSFULLY",
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },
};
