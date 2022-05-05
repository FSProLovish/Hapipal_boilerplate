const joi = require("joi").extend(require("@hapi/joi-date"));

const schema1 = joi.object({
  username: joi.string().min(4).max(8).required(),
  password: joi.string().min(5).max(10).required(),
});

module.exports = { schema1 };
