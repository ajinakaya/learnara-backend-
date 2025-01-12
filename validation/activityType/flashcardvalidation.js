const Joi = require("joi");

const flashcardActivitySchema = Joi.object({
  title: Joi.string().required().trim(),
  description: Joi.string().required(),
  cards: Joi.array().items(
    Joi.object({
      front: Joi.string().required(),
      back: Joi.string().required(),
      hint: Joi.string().optional(),
      example: Joi.string().optional(),
    }).required()
  ).required(),
  difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced').default('beginner'),
  order: Joi.number().required(),
  completionCriteria: Joi.object({
    cardsReviewed: Joi.number().required(),
    minimumCorrect: Joi.number().min(0).max(100).default(80),
  }).required(),
});

function FlashcardValidation(req, res, next) {
  const { title, description, cards, difficulty, order, completionCriteria } = req.body;

  const { error } = flashcardActivitySchema.validate({
    title,
    description,
    cards,
    difficulty,
    order,
    completionCriteria,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}

module.exports = FlashcardValidation;
