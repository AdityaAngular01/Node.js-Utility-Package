const https = require("https");
const http = require("http");
const querystring = require("querystring");

/**
 * Sends an HTTP GET request.
 * @param {string} url - The URL to send the request to.
 * @param {Object} [headers={}] - Optional headers to include in the request.
 * @returns {Promise} - The response body as a string.
 */
function sendGetRequest(url, headers = {}) {
	return new Promise((resolve, reject) => {
		const req = https.get(url, { headers }, (res) => {
			let data = "";
			res.on("data", (chunk) => (data += chunk));
			res.on("end", () => resolve(data));
		});

		req.on("error", reject);
	});
}

/**
 * Sends an HTTP POST request with JSON payload.
 * @param {string} url - The URL to send the request to.
 * @param {Object} payload - The data to send in the request body.
 * @param {Object} [headers={}] - Optional headers to include in the request.
 * @returns {Promise} - The response body as a string.
 */
function sendPostRequest(url, payload, headers = {}) {
	return new Promise((resolve, reject) => {
		const req = https.request(
			url,
			{
				method: "POST",
				headers: { "Content-Type": "application/json", ...headers },
			},
			(res) => {
				let data = "";
				res.on("data", (chunk) => (data += chunk));
				res.on("end", () => resolve(data));
			}
		);

		req.on("error", reject);
		req.write(JSON.stringify(payload));
		req.end();
	});
}

/**
 * Sends an HTTP PUT request with JSON payload.
 * @param {string} url - The URL to send the request to.
 * @param {Object} payload - The data to send in the request body.
 * @param {Object} [headers={}] - Optional headers to include in the request.
 * @returns {Promise} - The response body as a string.
 */
function sendPutRequest(url, payload, headers = {}) {
	return new Promise((resolve, reject) => {
		const req = https.request(
			url,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json", ...headers },
			},
			(res) => {
				let data = "";
				res.on("data", (chunk) => (data += chunk));
				res.on("end", () => resolve(data));
			}
		);

		req.on("error", reject);
		req.write(JSON.stringify(payload));
		req.end();
	});
}

/**
 * Sends an HTTP DELETE request.
 * @param {string} url - The URL to send the request to.
 * @param {Object} [headers={}] - Optional headers to include in the request.
 * @returns {Promise} - The response body as a string.
 */
function sendDeleteRequest(url, headers = {}) {
	return new Promise((resolve, reject) => {
		const req = https.request(
			url,
			{
				method: "DELETE",
				headers,
			},
			(res) => {
				let data = "";
				res.on("data", (chunk) => (data += chunk));
				res.on("end", () => resolve(data));
			}
		);

		req.on("error", reject);
		req.end();
	});
}

/**
 * Parses query parameters from a URL.
 * @param {string} url - The URL containing query parameters.
 * @returns {Object} - An object containing the query parameters.
 */
function parseQueryParams(url) {
	const parsedUrl = new URL(url);
	return querystring.parse(parsedUrl.search.slice(1));
}

/**
 * Parses the request body (JSON or form data).
 * @param {http.IncomingMessage} req - The HTTP request object.
 * @returns {Promise} - The parsed body (JSON or form data).
 */
function parseRequestBody(req) {
	return new Promise((resolve, reject) => {
		let body = "";
		req.on("data", (chunk) => (body += chunk));
		req.on("end", () => {
			try {
				if (req.headers["content-type"] === "application/json") {
					resolve(JSON.parse(body));
				} else if (
					req.headers["content-type"] ===
					"application/x-www-form-urlencoded"
				) {
					resolve(querystring.parse(body));
				} else {
					resolve(body);
				}
			} catch (error) {
				reject(error);
			}
		});
		req.on("error", reject);
	});
}

/**
 * Sets custom HTTP headers for a request.
 * @param {Object} headers - An object containing the headers.
 * @returns {Object} - The custom headers.
 */
function setCustomHeaders(headers) {
	return {
		...headers,
		"User-Agent": "Node.js HTTP Utility Package",
	};
}

/**
 * Handle HTTP status codes and return appropriate response.
 * @param {http.IncomingMessage} res - The HTTP response object.
 * @param {number} statusCode - The status code (e.g., 200, 404, 500).
 * @param {string} message - The message to return with the status.
 */
function handleHttpStatus(res, statusCode, message) {
	res.statusCode = statusCode;
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({ message }));
}

/**
 * Create a simple HTTP server.
 * @param {number} port - The port to listen on.
 * @param {Function} requestHandler - The function to handle incoming requests.
 */
function createHttpServer(port, requestHandler) {
	const server = http.createServer(requestHandler);
	server.listen(port, () => {
		console.log(`Server is listening on port ${port}`);
	});
}

/**
 * Send HTTP requests with authentication (Basic or Bearer).
 * @param {string} url - The URL to send the request to.
 * @param {Object} options - The options (headers, authentication type).
 * @returns {Promise} - The response body as a string.
 */
function sendAuthenticatedRequest(url, options = {}) {
	const { authType = "Bearer", token } = options;
	const headers = {
		Authorization: `${authType} ${token}`,
		...options.headers,
	};
	return sendGetRequest(url, headers);
}

/**
 * Create a request timeout handler.
 * @param {Promise} requestPromise - The HTTP request promise.
 * @param {number} timeout - The timeout duration in milliseconds.
 * @returns {Promise} - The result of the request or a timeout error.
 */
function requestWithTimeout(requestPromise, timeout = 5000) {
	const timeoutPromise = new Promise((_, reject) =>
		setTimeout(() => reject("Request Timeout"), timeout)
	);
	return Promise.race([requestPromise, timeoutPromise]);
}

/**
 * Handle redirects by checking the Location header and making a new request.
 * @param {string} url - The URL to send the request to.
 * @returns {Promise} - The response body after following the redirect.
 */
function followRedirect(url) {
	return sendGetRequest(url).then((response) => {
		const location = response.headers["location"];
		if (location) {
			return sendGetRequest(location);
		}
		return response;
	});
}

// Export all functions
module.exports = {
	sendGetRequest,
	sendPostRequest,
	sendPutRequest,
	sendDeleteRequest,
	parseQueryParams,
	parseRequestBody,
	setCustomHeaders,
	handleHttpStatus,
	createHttpServer,
	sendAuthenticatedRequest,
	requestWithTimeout,
	followRedirect,
};
