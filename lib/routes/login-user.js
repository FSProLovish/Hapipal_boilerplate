"use strict";

const JWT = require("jsonwebtoken");
const secret = "NeverShareYourSecret";

module.exports = {
  method: "POST",
  path: "/api/login-user",
  handler: async (request, h) => {
    try {
      const { User } = request.server.models();
      const check = await User.query()
        .select("user_id", "username", "password")
        .where({
          username: request.payload.name,
        })
        .where({
          password: request.payload.password,
        });
      if (check == 0) {
        return h
          .response({
            message: "USER IS NOT AUTHENTICATED OR WRONG CREDENTIALS",
          })
          .code(404);
      }
      const userobj = {
        username: check[0].username,
        password: check[0].password,
      };
      const token = JWT.sign(userobj, secret);
      const data = await User.query()
        .patch({
          token: token,
        })
        .where({
          username: request.payload.name,
        })
        .where({
          password: request.payload.password,
        });
      return {
        message: "SUCCESSFULLY TOKEN GENERATED",
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },
};
