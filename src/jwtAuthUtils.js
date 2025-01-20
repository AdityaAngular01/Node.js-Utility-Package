const jwt = require('jsonwebtoken');

export class JWTAuth {
	#secret = "";
	#expiresIn = "";
	constructor() {}

	config(secret, expiresIn = "24h") {
		this.#secret = secret;
		this.#expiresIn = expiresIn;
	}

	setUser(user) {
		if (!user) throw new Error("User not found");

		let obj = {};

		Object.keys(user).forEach((key) => {
			obj[key] = user[key]; // Corrected: Use user[key] instead of user.key
		});

		return jwt.sign(obj, this.#secret, { expiresIn: this.#expiresIn });
	}

	getUser(token) {
		try {
			return !token ? null : jwt.verify(token, this.#secret);
		} catch (err) {
			if (err.name === "TokenExpiredError") {
				throw new Error("Token expired");
			}
			throw new Error("Invalid token");
		}
	}

	restrictToLoggedInUserOnly() {
		return async function (request, response, next) {
			const headers = request.headers?.authorization;

			if (!headers) {
				return response
					.status(401)
					.json({ error: { message: "You must be logged in" } });
			}

			const token = headers.split(" ")[1];

			try {
				const user = await getUser(token, this.#secret); // Pass secret to getUser()

				if (!user) {
					return response
						.status(401)
						.json({ message: "You must be logged in" });
				}

				request.user = user; // Attach user to the request object
				next(); // Proceed to the next middleware or route handler
			} catch (error) {
				return response.status(401).json({
					message: "Invalid token or error occurred",
				});
			}
		};
	}
}

// module.exports = { setUser, getUser, restrictToLoggedInUserOnly };