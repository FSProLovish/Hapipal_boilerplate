const { Model } = require("@hapipal/schwifty");
const Joi = require("joi").extend(require("@hapi/joi-date"));

module.exports = class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "userId";
  }

  static get joiSchema() {
    return Joi.object({
      userId: Joi.number().positive().integer(),
      username: Joi.string().min(5).max(8).required(),
      password: Joi.string().min(5).max(10).required(),
      token: Joi.string().max(255).allow(null),
    });
  }
};
