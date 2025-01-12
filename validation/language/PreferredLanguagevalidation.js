const Joi = require("joi");

// Validation schema for preferred language
const preferredLanguageValidationSchema = Joi.object({
  languageName: Joi.string().required().trim().max(255), // Language name must be a string
});


function PreferredLanguageValidation(req, res, next) {
  const { languageName } = req.body;

  // Check if the language image is present (as a file upload)
  if (!req.file) {
    return res.status(400).json({ error: '"languageImage" is required' });
  }

  const { error } = preferredLanguageValidationSchema.validate({ languageName });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}

module.exports = PreferredLanguageValidation;
