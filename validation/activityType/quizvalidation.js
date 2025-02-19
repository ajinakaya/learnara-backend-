const Joi = require("joi");

const quizActivitySchema = Joi.object({
  title: Joi.string().required().trim(),
  description: Joi.string().required(),
  questions: Joi.array().items(
    Joi.object({
      _id: Joi.string().optional(),
      question: Joi.string().required(),
      options: Joi.array().items(Joi.string().required()).min(2).required(),
      correctAnswer: Joi.string().required(),
      explanation: Joi.string().optional(),
    }).required()
  ).min(1).required(),
  duration: Joi.number().required(), 
  difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced').default('beginner'),
  order: Joi.number().required(),
  completionCriteria: Joi.object({
    passingScore: Joi.number().min(0).max(100).default(70),
    attemptsAllowed: Joi.number().default(3)
  }).required(),
});

function QuizValidation(req, res, next) {
  const { title, description, questions, duration, difficulty, order, completionCriteria } = req.body;

  const { error } = quizActivitySchema.validate({
    title,
    description,
    questions,
    duration,
    difficulty,
    order,
    completionCriteria,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}

module.exports = QuizValidation;
