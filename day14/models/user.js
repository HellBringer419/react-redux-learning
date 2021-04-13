const path = require("path");
const fs = require("fs");

const p = path.join(path.dirname(require.main.filename), "data", "users.json");
const getAllUsersFromFile = (usersCallBack) => {
	fs.readFile(p, (error, fileContent) => {
		if (error) usersCallBack([]);
		else usersCallBack(JSON.parse(fileContent));
	});
};

module.exports = class User {
	constructor(
		id,
		userName,
		profilePic,
		email,
		password,
		firstName,
		lastName,
		role,
		dob = null
	) {
		this._id = id;
		this.userName = userName;
		this.profilePic = profilePic;
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
		if (dob) {
			this.dob = dob;
			const millisInAYear = 1000 * 60 * 60 * 24 * 365.25;
			this.age = Math.floor(Math.abs(new Date() - dob)/millisInAYear ); // TODO: add age calculation
		}
	}

	save(idCallback) {
		getAllUsersFromFile((users) => {
			if (!users) return idCallback(0);
			if (this._id) {
				// update this user
				const existingUserIndex = users.findIndex(
					(user) => user._id === this._id
				);
				users[existingUserIndex] = this;
			} else {
				this._id = Math.floor(Math.random() * 10000 + 1000).toString();
				users.push(this);
			}
			fs.writeFile(p, JSON.stringify(users, null, 4), (error) => {
				if (error) {
					idCallback(0);
					console.error("[ERROR] in save:writeFile");
					console.log(error);
				} else idCallback(this._id);
			});
		});
	}

	static findAll(usersCallBack) {
		getAllUsersFromFile(usersCallBack);
	}

	static findById(id, userCallBack) {
		getAllUsersFromFile((users) => {
			const user = users.find((user) => user._id === id);
			if (!user) {
				userCallBack({});
				console.error("[ERROR] in findById");
			} else userCallBack(user);
		});
	}

	static findByEmail(email, userCallBack) {
		getAllUsersFromFile((users) => {
			const user = users.find((user) => user.email === email);
			userCallBack(user);
		});
	}

	static delete(id, idCallback) {
		getAllUsersFromFile((users) => {
			const user = users.find((user) => user._id === id);
			if (user) users = users.filter((user) => user._id !== id);
			else idCallback(-1);

			fs.writeFile(p, JSON.stringify(users, null, 4), (error) => {
				if (error) idCallback(0);
				else idCallback(id);
			});
		});
	}
};
