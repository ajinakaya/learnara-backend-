const Joi = require('joi');

const audioActivitySchema = Joi.object({
  title: Joi.string().min(3).required(), 
  description: Joi.string().min(10).required(), 
  duration: Joi.number().min(1).required(), 
  difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced').optional(), 
  order: Joi.number().min(1).required() 
});

function AudioValidation(req, res, next) {
  const { title, description, duration, difficulty, order } = req.body;

  // Check if the audio file exists in req.file
  if (!req.file) {
    return res.status(400).json({ error: '"audioFile" is required' });
  }


  const { error } = audioActivitySchema.validate({
    title,
    description,
    duration,
    difficulty,
    order,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}

module.exports = AudioValidation;
