const jwt = require('jsonwebtoken');

function setUser(user, secret, expiresIn='24h'){
	if (!user) throw new Error("User not found");

	let obj = {};

	Object.keys(user).forEach((key) => {
		obj[key] = user.key;
	});

	return jwt.sign(obj, secret, { expiresIn: expiresIn });
};

function getUser(token, secret){

    try {
        return !token? null : jwt.verify(token, secret)
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new Error("Token expired");
        }
        throw new Error("Invalid token");
    }
}

async function restrictToLoggedInUserOnly (request, response, next) {
	const headers = request.headers?.authorization;

	if (!headers)
		return response
			.status(401)
			.json({ error: { message: "You must be logged in" } });

	const token = headers.split(" ")[1];

	const user = getUser(token);

	if (!user)
		return response
			.status(401)
			.json({ error: { message: "You must be logged in" } });

	request.user = user;

	next();
};

module.exports = { setUser, getUser, restrictToLoggedInUserOnly };