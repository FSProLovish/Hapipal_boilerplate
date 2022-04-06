"use strict";

module.exports = {
  method: "POST",
  path: "/users/addOrder/{id}",
  handler: async (request, h) => {
    try {
      const { User } = request.server.models();

      const user = await User.query().findOne({
        user_id: request.params.id,
      });
      if (!user) {
        return h.response({ error: "customer doesn't exist" }).code(404);
      }
      const token = user.token;
      if (!token) {
        return h.response({ error: "customer is not logged in." }).code(400);
      }

      const dataOrder = request.payload;
      const order = await User.relatedQuery("orders")
        .for(request.params.id)
        .insert(dataOrder);
      order.message = "Order is Added";
      return h.response(order);
    } catch (error) {
      return h
        .response({
          message: error.message,
        })
        .code(500);
    }
  },
};
