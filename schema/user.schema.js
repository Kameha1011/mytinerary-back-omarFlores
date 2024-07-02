import Joi from "joi-oid";

export const createUserSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
    })
    .messages({
      "any.required": "El email es requerido",
    }),
  password: Joi.string().required().min(8).max(35).alphanum(),
  name: Joi.string().min(2).max(50),
  // .regex(solo caracteres alfabeticos),
  picture: Joi.string().required().uri(),
  country: Joi.string().required(),
  itineraries: Joi.array().items(Joi.objectId())
});
