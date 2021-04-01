const { body } = require("express-validator");

// TODO: add email validation properly
module.exports = [
    // body("email")
    //     .trim()
    //     .normalizeEmail()
    //     .isEmail()
    //     .withMessage("Please enter a valid email")
    //     .custom((value, { req }) => {
    //         return User.findByEmail(value, (user) => {
    //             if (user.email) {
    //                 return Promise.reject(
    //                     "E-Mail exists already, please pick a different one."
    //                 );
    //             }
    //         });
    //     }),
    body(
        "password",
        "Please enter a password with only numbers and text and at least 5 characters."
    )
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim()
        .not()
        .isEmpty(),
];
