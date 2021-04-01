const { validationResult } = require("express-validator");

const User = require("../models/user");

exports.getAllUsers = (req, res, next) => {
    User.findAll((users) => {
        res.status(200).json(users);
    });
};

exports.getUser = (req, res, next) => {
    User.findById(req.params.id, (user) => {
        if (!user) {
            const error = new Error("No Such User");
            error.statusCode = 404;
            next(error);
        } else {
            res.status(200).json(user);
        }
    });
};

exports.postUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Invalid User details");
        error.statusCode = 422;
        throw error;
    }

    const user = new User(
        null,
        req.body.userName,
        req.body.profilePic,
        req.body.email,
        req.body.password,
        req.body.firstName,
        req.body.lastName,
        "USER"
    );
    if (!user) {
        const error = new Error("Invalid User details");
        error.statusCode = 422;
        throw error;
    } else {
        user.save((id) => {
            if (id === 0) {
                const error = new Error("Error while saving");
                error.statusCode = 500;
                next(error);
            } else res.status(201).json({ message: "succesful", id });
        });
    }
};

exports.putUser = (req, res, next) => {
    if (req.token.id !== req.params.id) {
        const error = new Error("Un-Authorized to delete this");
        error.statusCode = 403;
        throw error;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Invalid User details");
        error.statusCode = 422;
        throw error;
    }

    const user = new User(
        req.body.id,
        req.body.userName,
        req.body.profilePic,
        req.body.email,
        req.body.password,
        req.body.firstName,
        req.body.lastName,
        "USER"
    );
    if (!user) {
        const error = new Error("Invalid User details");
        error.statusCode = 422;
        throw error;
    } else {
        user.save((id) => {
            if (id === 0) {
                const error = new Error("Error while saving");
                error.statusCode = 500;
                next(error);
            } else
                res.status(201).json({
                    message: `Updated Product with id: ${id}`,
                    id,
                });
        });
    }
};

exports.deleteUser = (req, res, next) => {
    if (req.token.id !== req.params.id) {
        const error = new Error("Un-Authorized to delete this");
        error.statusCode = 403;
        throw error;
    }
    User.delete(req.params.id, (id) => {
        if (!id) {
            const error = new Error("error");
            error.statusCode = 500;
            next(error);
        } else {
            if (id === -1) {
                const error = new Error("No Such User");
                error.statusCode = 404;
                next(error);
                return;
            } else
                res.status(200).json({ message: `Deleted user with id ${id}` });
        }
    });
};
