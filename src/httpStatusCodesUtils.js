// HTTP Status Codes and Messages Utility

const HTTP_STATUS_CODES = {
	// Informational responses (100–199)
	CONTINUE: 100,
	SWITCHING_PROTOCOLS: 101,
	PROCESSING: 102,
	EARLY_HINTS: 103,

	// Successful responses (200–299)
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,
	NON_AUTHORITATIVE_INFORMATION: 203,
	NO_CONTENT: 204,
	RESET_CONTENT: 205,
	PARTIAL_CONTENT: 206,
	MULTI_STATUS: 207,
	ALREADY_REPORTED: 208,
	IM_USED: 226,

	// Redirection messages (300–399)
	MULTIPLE_CHOICES: 300,
	MOVED_PERMANENTLY: 301,
	FOUND: 302,
	MOVED_TEMPORARILY: 302,
	SEE_OTHER: 303,
	NOT_MODIFIED: 304,
	USE_PROXY: 305,
	TEMPORARY_REDIRECT: 307,
	PERMANENT_REDIRECT: 308,

	// Client error responses (400–499)
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	REQUEST_TOO_LONG: 413,
	REQUEST_URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	REQUESTED_RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	IM_A_TEAPOT: 418,
	INSUFFICIENT_SPACE_ON_RESOURCE: 419,
	METHOD_FAILURE: 420,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_ENTITY: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,

	// Server error responses (500–599)
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	INSUFFICIENT_STORAGE: 507,
	NETWORK_AUTHENTICATION_REQUIRED: 511,
};

/**
 * Get the HTTP status code based on a name.
 * @param {string} statusName - The name of the status code (e.g., 'OK', 'NOT_FOUND').
 * @returns {number} - The corresponding HTTP status code.
 */
function getStatusCode(statusName) {
	return HTTP_STATUS_CODES[statusName.toUpperCase()] || null;
}

/**
 * Get the status message based on the HTTP status code.
 * @param {number} statusCode - The HTTP status code.
 * @returns {string} - The corresponding status message.
 */
function getStatusMessage(statusCode) {
	const statusMessages = {
        [HTTP_STATUS_CODES.CONTINUE] : 'Continue',
        [HTTP_STATUS_CODES.SWITCHING_PROTOCOLS]: 'Switching Protocols',
        [HTTP_STATUS_CODES.PROCESSING]: 'Processing',
        [HTTP_STATUS_CODES.EARLY_HINTS]: 'Early Hints',

		[HTTP_STATUS_CODES.OK]: "OK",
		[HTTP_STATUS_CODES.CREATED]: "Created",
		[HTTP_STATUS_CODES.ACCEPTED]: "Accepted",
        [HTTP_STATUS_CODES.NON_AUTHORITATIVE_INFORMATION] : "Non Authoritative Information",
		[HTTP_STATUS_CODES.NO_CONTENT]: "No Content",
        [HTTP_STATUS_CODES.RESET_CONTENT]: "Reset Content",
        [HTTP_STATUS_CODES.PARTIAL_CONTENT]: "Partial Content",
        [HTTP_STATUS_CODES.MULTI_STATUS]: "Multi-Status",

        [HTTP_STATUS_CODES.MULTIPLE_CHOICES]: "Multiple Choices",
        [HTTP_STATUS_CODES.MOVED_PERMANENTLY]: "Moved Permanently",
        [HTTP_STATUS_CODES.MOVED_TEMPORARILY]: "Moved Temporarily",
        [HTTP_STATUS_CODES.SEE_OTHER]: "See Other",
        [HTTP_STATUS_CODES.NOT_MODIFIED]: "Not Modified",
        [HTTP_STATUS_CODES.USE_PROXY]: "Use Proxy",
        [HTTP_STATUS_CODES.TEMPORARY_REDIRECT]: "Temporary Redirect",
        [HTTP_STATUS_CODES.PERMANENT_REDIRECT]: "Permanent Redirect",


		[HTTP_STATUS_CODES.BAD_REQUEST]: "Bad Request",
		[HTTP_STATUS_CODES.UNAUTHORIZED]: "Unauthorized",
        [HTTP_STATUS_CODES.PAYMENT_REQUIRED]: "Payment Required",
		[HTTP_STATUS_CODES.FORBIDDEN]: "Forbidden",
		[HTTP_STATUS_CODES.NOT_FOUND]: "Not Found",
        [HTTP_STATUS_CODES.METHOD_NOT_ALLOWED]: "Method Not Allowed",
        [HTTP_STATUS_CODES.NOT_ACCEPTABLE]: "Not Acceptable",
        [HTTP_STATUS_CODES.PROXY_AUTHENTICATION_REQUIRED]: "Proxy Authentication Required",
        [HTTP_STATUS_CODES.REQUEST_TIMEOUT]: "Request Timeout",
        [HTTP_STATUS_CODES.CONFLICT]: "Conflict",
        [HTTP_STATUS_CODES.GONE]: "Gone",
        [HTTP_STATUS_CODES.LENGTH_REQUIRED]: "Length Required",
        [HTTP_STATUS_CODES.PRECONDITION_FAILED]: "Precondition Failed",
        [HTTP_STATUS_CODES.REQUEST_TOO_LONG]: "Request Entity Too Large",
        [HTTP_STATUS_CODES.REQUEST_URI_TOO_LONG]: "Request-URI Too Long",
        [HTTP_STATUS_CODES.UNSUPPORTED_MEDIA_TYPE]: "Unsupported Media Type",
        [HTTP_STATUS_CODES.REQUESTED_RANGE_NOT_SATISFIABLE]: "Requested Range Not Satisfiable",
        [HTTP_STATUS_CODES.EXPECTATION_FAILED]: "Expectation Failed",
        [HTTP_STATUS_CODES.IM_A_TEAPOT]: "I'm a Teapot",
        [HTTP_STATUS_CODES.INSUFFICIENT_SPACE_ON_RESOURCE]: "Insufficient Space on Resource",
        [HTTP_STATUS_CODES.METHOD_FAILURE]: "Method Failure",
        [HTTP_STATUS_CODES.MISDIRECTED_REQUEST]: "Misdirected Request",
        [HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: "Unprocessable Entity",
        [HTTP_STATUS_CODES.LOCKED]: "Locked",
        [HTTP_STATUS_CODES.FAILED_DEPENDENCY]: "Failed Dependency",
        [HTTP_STATUS_CODES.UPGRADE_REQUIRED]: "Upgrade Required",
        [HTTP_STATUS_CODES.PRECONDITION_REQUIRED]: "Precondition Required",
        [HTTP_STATUS_CODES.TOO_MANY_REQUESTS]: "Too Many Requests",
        [HTTP_STATUS_CODES.REQUEST_HEADER_FIELDS_TOO_LARGE]: "Request Header Fields Too Large",
        [HTTP_STATUS_CODES.UNAVAILABLE_FOR_LEGAL_REASONS]: "Unavailable For Legal Reasons",

		[HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR]: "Internal Server Error",
        [HTTP_STATUS_CODES.NOT_IMPLEMENTED]: "Not Implemented",
        [HTTP_STATUS_CODES.BAD_GATEWAY]: "Bad Gateway",
		[HTTP_STATUS_CODES.SERVICE_UNAVAILABLE]: "Service Unavailable",
        [HTTP_STATUS_CODES.GATEWAY_TIMEOUT]: "Gateway Timeout",
        [HTTP_STATUS_CODES.HTTP_VERSION_NOT_SUPPORTED]: "HTTP Version Not Supported",
        [HTTP_STATUS_CODES.INSUFFICIENT_STORAGE]: "Insufficient Storage",
        [HTTP_STATUS_CODES.NETWORK_AUTHENTICATION_REQUIRED]: "Network Authentication Required",
    };

	return statusMessages[statusCode] || "Unknown Status Code";
}

/**
 * Checks if a given HTTP status code indicates success (2xx).
 * @param {number} statusCode - The HTTP status code.
 * @returns {boolean} - True if successful (2xx), false otherwise.
 */
function isSuccessful(statusCode) {
	return statusCode >= 200 && statusCode < 300;
}

/**
 * Checks if a given HTTP status code indicates a client error (4xx).
 * @param {number} statusCode - The HTTP status code.
 * @returns {boolean} - True if a client error (4xx), false otherwise.
 */
function isClientError(statusCode) {
	return statusCode >= 400 && statusCode < 500;
}

/**
 * Checks if a given HTTP status code indicates a server error (5xx).
 * @param {number} statusCode - The HTTP status code.
 * @returns {boolean} - True if a server error (5xx), false otherwise.
 */
function isServerError(statusCode) {
	return statusCode >= 500 && statusCode < 600;
}

/**
 * Generate a standard response object with status code and message.
 * @param {number} statusCode - The HTTP status code.
 * @param {string} [message] - Optional custom message.
 * @returns {Object} - A response object containing status code and message.
 */
function generateResponse(statusCode, message) {
	const responseMessage = message || getStatusMessage(statusCode);
	return {
		statusCode,
		message: responseMessage,
	};
}

// Export functions
module.exports = {
	HTTP_STATUS_CODES,
	getStatusCode,
	getStatusMessage,
	isSuccessful,
	isClientError,
	isServerError,
	generateResponse,
};
