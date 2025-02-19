const Joi = require("joi");

const goalValidationSchema = Joi.object({
  goal: Joi.string().required().trim().max(255),
  levels: Joi.array()
    .items(
      
      Joi.object({
        _id: Joi.string().optional(),
        level: Joi.string()
          .valid('A1', 'A2', 'B1', 'B2')
          .required(),
        description: Joi.string().required(),
      })
    )
    .min(1)
    .required(),
});

function GoalValidation(req, res, next) {
  const { goal, levels } = req.body;

  const { error } = goalValidationSchema.validate({ goal, levels });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}

module.exports = GoalValidation;
