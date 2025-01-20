const fs = require("fs");
const path = require("path");

/**
 * Creates a log message with a timestamp.
 * @param {string} level - The log level (info, warn, error).
 * @param {string} message - The log message.
 * @returns {string} - The formatted log message.
 */
function createLogMessage(level, message) {
	const timestamp = new Date().toISOString();
	return `[${timestamp}] [${level.toUpperCase()}] - ${message}`;
}

/**
 * Logs an info message to the console and a log file.
 * @param {string} message - The info message to log.
 */
function logInfo(message) {
	const logMessage = createLogMessage("info", message);
	console.log(logMessage);
	saveLogToFile(logMessage);
}

/**
 * Logs a warning message to the console and a log file.
 * @param {string} message - The warning message to log.
 */
function logWarn(message) {
	const logMessage = createLogMessage("warn", message);
	console.warn(logMessage);
	saveLogToFile(logMessage);
}

/**
 * Logs an error message to the console and a log file.
 * @param {string} message - The error message to log.
 */
function logError(message) {
	const logMessage = createLogMessage("error", message);
	console.error(logMessage);
	saveLogToFile(logMessage);
}

/**
 * Logs an error with a stack trace.
 * @param {Error} error - The error object.
 */
function logErrorWithStack(error) {
	const logMessage = createLogMessage(
		"error",
		`${error.message}\n${error.stack}`
	);
	console.error(logMessage);
	saveLogToFile(logMessage);
}

/**
 * Saves log messages to a file.
 * @param {string} message - The log message.
 */
function saveLogToFile(message) {
	const logFilePath = path.join(__dirname, "app.log");
	fs.appendFile(logFilePath, message + "\n", (err) => {
		if (err) console.error("Failed to write to log file", err);
	});
}

/**
 * Clears the log file.
 */
function clearLogFile() {
	const logFilePath = path.join(__dirname, "app.log");
	fs.truncate(logFilePath, 0, (err) => {
		if (err) console.error("Failed to clear log file", err);
		else console.log("Log file cleared.");
	});
}

/**
 * Rotates the log file if it exceeds the specified size.
 * @param {string} logFilePath - The path to the log file.
 * @param {number} maxSize - The maximum size (in bytes) before rotation.
 */
function rotateLogFile(logFilePath, maxSize = 5000000) {
	// 5MB
	fs.stat(logFilePath, (err, stats) => {
		if (err) {
			console.error("Failed to check log file size", err);
			return;
		}

		if (stats.size > maxSize) {
			const newLogFilePath = path.join(
				__dirname,
				`app-${Date.now()}.log`
			);
			fs.rename(logFilePath, newLogFilePath, (err) => {
				if (err) console.error("Failed to rotate log file", err);
				else console.log(`Log file rotated to: ${newLogFilePath}`);
			});
		}
	});
}

/**
 * Creates a custom log format with additional metadata (like request ID, user ID).
 * @param {string} level - The log level (info, warn, error).
 * @param {string} message - The log message.
 * @param {Object} metadata - Additional metadata to include (e.g., request ID, user ID).
 * @returns {string} - The custom formatted log message.
 */
function createCustomLogMessage(level, message, metadata = {}) {
	const timestamp = new Date().toISOString();
	const metaInfo = Object.entries(metadata)
		.map(([key, value]) => `${key}: ${value}`)
		.join(", ");
	return `[${timestamp}] [${level.toUpperCase()}] - ${message} ${
		metaInfo ? `| ${metaInfo}` : ""
	}`;
}

// Export all functions
module.exports = {
	logInfo,
	logWarn,
	logError,
	logErrorWithStack,
	saveLogToFile,
	clearLogFile,
	rotateLogFile,
	createCustomLogMessage,
};
