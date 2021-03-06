"use strict";

module.exports = {
  method: "PATCH",
  path: "/users/reset-password",
  handler: async (request, h) => {
    try {
      const { User } = request.server.models();

      const check = await User.query()
        .select("token")
        .where({
          username: request.payload.name,
        })
        .where({
          password: request.payload.password,
        });

      if (check == 0) {
        return h
          .response({
            message:
              "NOT A USER IN DATABASE GO AND SIGN UP OR WRONG CREDENTIALS!!",
          })
          .code(404);
      }
      const token = check[0].token;

      if (!token) {
        return h
          .response({
            message: "USER MUST HAVE TO SIGN IN",
          })
          .code(401);
      }
      if (request.payload.newPassword === request.payload.confirmPassword) {
        const updated = await User.query()
          .patch({
            password: request.payload.newPassword,
          })
          .where({
            username: request.payload.name,
          });
        return {
          message: "UPDATE PASSWORD SUCCESSFULLY",
        };
      }
      return {
        message: "Password & ConfirmPassword not match!!",
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },
};
