const Joi = require("joi");

const videoActivitySchema = Joi.object({
  title: Joi.string().required().trim(),
  description: Joi.string().required(),
  duration: Joi.number().required(),
  thumbnailUrl: Joi.string().optional().uri(),
  transcription: Joi.string().optional(),
  difficulty: Joi.string()
    .valid('beginner', 'intermediate', 'advanced')
    .default('beginner'),
  order: Joi.number().required(),
});

function VideoValidation(req, res, next) {
  const { title, description, duration, thumbnailUrl, transcription, difficulty, order,  } = req.body;

  // Check if the video file exists
  if (!req.file) {
    return res.status(400).json({ error: '"video" file is required' });
  }

  const { error } = videoActivitySchema.validate({
    title,
    description,
    duration,
    thumbnailUrl,
    transcription,
    difficulty,
    order,

  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}

module.exports = VideoValidation;
