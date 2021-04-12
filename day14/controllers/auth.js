const crypto = require("crypto");

const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.postLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	User.findByEmail(email, (user) => {
		if (!user) {
			const error = new Error("Invalid email or password");
			error.statusCode = 401;
			next(error);
			return;
		}
		bcrypt
			.compare(password, user.password)
			.then((doMatch) => {
				if (!doMatch) {
					const error = new Error("Invalid email or password");
					error.statusCode = 401;
					throw error;
				}

				const token = jwt.sign(
					{ email, id: user._id, role: user.role },
					process.env.JWT_SECRET_KEY,
					{ expiresIn: "1h" }
				);

				res.status(200).json({ token, id: user._id, role: user.role });
			})
			.catch((err) => {
				console.error("[ERROR] in postLogin:bcrypt.compare");
				if (!err.statusCode) err.statusCode = 500;
				next(err);
			});
	});
};

exports.postSignup = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = new Error("Validation Failed");
		error.statusCode = 422;
		error.data = errors.array();
		throw error;
	}

	const password = req.body.password;

	bcrypt
		.hash(password, 12)
		.then((hashedPassword) => {
			const user = new User(
				null,
				req.body.userName,
				req.body.profilePic,
				req.body.email,
				hashedPassword,
				req.body.firstName,
				req.body.lastName,
				"USER"
			);
			return user.save((id) => {
				if (id === 0) {
					const error = new Error("Error in WRITE operation");
					error.statusCode = 500;
					throw error;
				} else {
					res.status(201).json({ message: "succesful", id });
				}
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

// TODO: implement proper log-out
exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect("/");
	});
};
