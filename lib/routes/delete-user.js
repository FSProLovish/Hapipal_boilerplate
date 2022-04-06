"use strict";

module.exports = {
  method: "DELETE",
  path: "/users/{id}",
  handler: async (request, h) => {
    try {
      const { User } = request.server.models();
      const user_token = await User.query().findOne({
        user_id: request.params.id,
      });

      if (!user_token) {
        return h
          .response({
            message: "SIGN UP OR WRONG CREDENTIALS",
          })
          .code(404);
      }
      const token = user_token.token;
      if (!token) {
        return h
          .response({
            message: "YOU MUST HAVE TO SIGN IN",
          })
          .code(401);
      }

      const order_delete = await User.relatedQuery("orders")
        .for(request.params.id)
        .delete();
      const user_delete = await User.query().delete().where({
        token: token,
      });

      return {
        message: "DELETED USER AND ORDERS SUCCESSFULLY",
      };
    } catch (error) {
      return h
        .response({
          message: error.message,
        })
        .code(500);
    }
  },
};
