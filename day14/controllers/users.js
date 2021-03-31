const e = require("express");
const User = require("../models/user");

exports.getAllUsers = (req, res, next) => {
  User.findAll((users) => {
    res.status(200).json(users);
  });
};

exports.getUser = (req, res, next) => {
  User.findById(req.params.id, (user) => {
    if (!user) res.status(500).json({ message: "error" });
    else {
      if (user._id === undefined)
        res.status(404).json({ message: "No Such User" });
      else res.status(200).json(user);
    }
  });
};

exports.postUser = (req, res, next) => {
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
  if (!user) res.status(500).json({ message: "Invalid User details" });
  else {
    user.save((id) => {
      if (id === 0) res.status(500).json({ message: "error" });
      else res.status(201).json({ message: "succesful", id });
    });
  }
};

exports.deleteUser = (req, res, next) => {
  User.delete(req.params.id, (id) => {
    if (!id) res.status(500).json({ message: "error" });
    else {
      if (id === -1) res.status(404).json({ message: "No Such User" });
      else if (id === 0) res.status(500).json({ message: "error in write" });
      else res.status(200).json({ message: `Deleted user with id ${id}` });
    }
  });
};
