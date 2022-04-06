const { Model } = require("@hapipal/schwifty");
const Joi = require("joi").extend(require("@hapi/joi-date"));

module.exports = class Order extends Model {
  static get tableName() {
    return "orders";
  }

  static get idColumn() {
    return "orderId";
  }

  static get joiSchema() {
    return Joi.object({
      orderTotal: Joi.number().positive().integer().required(),
      userId: Joi.number().positive().integer(),
    });
  }
};
