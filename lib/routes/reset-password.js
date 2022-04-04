"use strict";

module.exports = {
  method: "PATCH",
  path: "/api/reset-password",
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
      console.log(check);
      if (check == 0) {
        return {
          message:
            "NOT A USER IN DATABASE GO AND SIGN UP OR PASSWORD IS WRONG!!",
        };
      }
      if (check[0].token == null) {
        return {
          message: "YOU MUST HAVE TO SIGN IN !!",
        };
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
