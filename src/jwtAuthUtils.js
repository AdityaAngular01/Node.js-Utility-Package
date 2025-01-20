const jwt = require("jsonwebtoken");

class JWTAuth {
	#secret = "";
	#expiresIn = "";
	constructor() {}

	// Config method to initialize secret and expiration time
	config(secret, expiresIn = "24h") {
		this.#secret = secret;
		this.#expiresIn = expiresIn;
	}

	// Method to create JWT token for a user
	setUser(user) {
		if (!user) throw new Error("User not found");

		let obj = {};

		Object.keys(user).forEach((key) => {
			obj[key] = user[key];
		});

		// Sign and return JWT
		return jwt.sign(obj, this.#secret, { expiresIn: this.#expiresIn });
	}

	// Method to verify and decode the token
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

	// Middleware to restrict access to logged-in users only
	restrictToLoggedInUserOnly = (request, response, next) =>{
			const headers = request.headers?.authorization;

			// If no authorization header, return error
			if (!headers) {
				return response
					.status(401)
					.json({ error: { message: "You must be logged in" } });
			}

			const token = headers.split(" ")[1];

			// Use the getUser method to verify the token
			try {
				const user = this.getUser(token); // Access the getUser method correctly

				if (!user) {
					return response
						.status(401)
						.json({ message: "You must be logged in" });
				}

				// Attach the user to the request object
				request.user = user;
				next(); // Proceed to the next middleware or route handler
			} catch (error) {
				// Handle any errors that occur during token verification
				return response.status(401).json({
					message: "Invalid token or error occurred",
				});
			}
		};
	
}

module.exports = JWTAuth;
