"use strict";

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
        return {
          message:
            "NOT A USER IN DATABASE GO AND SIGN UP OR PASSWORD IS WRONG!!",
        };
      }
      if (user_token[0].token == null) {
        return {
          message: "YOU MUST HAVE TO SIGN IN !!",
        };
      }
      const remove = await User.query()
        .patch({
          token: null,
        })
        .where({
          token: user_token[0].token,
        });
      return {
        remove,
        message: "SUCCESSFULLY LOGOUT !!",
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },
};
