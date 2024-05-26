const { body, validationResult } = require("express-validator");

// Middleware untuk validasi login form
const validateLoginForm = [
  // Validasi email/username saat input
  body("emailUsername")
    .notEmpty()
    .withMessage("Email/username cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Email/username must be at least 6 characters"),

  // Validasi password saat input
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  // Jalankan validasi dan tangkap hasilnya
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Lanjut ke controller jika tidak ada error
  },
];

module.exports = validateLoginForm;
