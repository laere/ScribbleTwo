const Joi = require("joi");

function validateUser(user) {
  const schema = Joi.object()
    .keys({
      username: Joi.string()
        .min(2)
        .max(50)
        .required(),
      email: Joi.string()
        .min(2)
        .max(50)
        .email({ minDomainAtoms: 2 })
        .required(),
      password: Joi.string()
        .min(6)
        .max(24)
        .required()
    })
    .unknown();

  return Joi.validate(user, schema);
}

module.exports = validateUser;
