const Schwifty = require("@hapipal/schwifty");
const { knexSnakeCaseMappers } = require("objection");

// const hapiAuthJWT = require("hapi-auth-jwt2");

// const secret = "NeverShareYourSecret";
// const validate = async function (decoded, request, h) {
//   // do your checks to see if the person is valid
//   if (!people[decoded.id]) {
//     return { isValid: false };
//   } else {
//     return { isValid: true };
//   }
// };

module.exports = [
  {
    plugin: Schwifty,
    options: {
      knex: {
        client: "mysql2",
        connection: {
          host: "127.0.0.1",
          port: "3306",
          user: "root",
          password: "PItutary6@",
          database: "hapi_tutorial",
          waitForConnections: true,
          connectionLimit: 100,
          queueLimit: 0,
          typeCast(field, next) {
            if (field.type === "TINY" && field.length === 1) {
              return field.string() === "1";
            }
            return next();
          },
        },
        pool: { min: 5, max: 100 },
        ...knexSnakeCaseMappers(),
      },
    },
  },
  // {
  //   plugin: hapiAuthJWT,
  //   options: {
  //     key: secret,
  //     validate,
  //     verifyOptions: { ignoreExpiration: true },
  //   },
  // },
];
