
const readline = require("readline");
const path = require("path");
const fs = require("fs");
let chalk;

(async () => {
	chalk = (await import("chalk")).default;
})();


/**
 * Parses command-line arguments and returns an object.
 * @param {Array<string>} args - The command-line arguments (default is process.argv).
 * @returns {object} - An object containing key-value pairs of command-line options.
 */
function parseArgs(args = process.argv.slice(2)) {
	const options = {};
	args.forEach((arg, index) => {
		if (arg.startsWith("--")) {
			const key = arg.slice(2);
			const value =
				args[index + 1] && !args[index + 1].startsWith("--")
					? args[index + 1]
					: true;
			options[key] = value;
		}
	});
	return options;
}

/**
 * Creates a prompt that asks a question and returns the answer.
 * @param {string} question - The question to ask the user.
 * @param {boolean} [hidden=false] - Whether to hide the input (for passwords).
 * @returns {Promise<string>} - A promise that resolves with the user's input.
 */
function askQuestion(question, hidden = false) {
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			terminal: !hidden,
		});
		rl.question(question, (answer) => {
			rl.close();
			resolve(answer);
		});
	});
}

/**
 * Displays a success message to the user.
 * @param {string} message - The message to display.
 */
async function logSuccess(message) {
	const chalk = (await import('chalk')).default;
	console.log(chalk.green(`✔ ${message}`));
}

/**
 * Displays an error message to the user.
 * @param {string} message - The message to display.
 */
async function logError(message) {
	const chalk = (await import("chalk")).default;
	console.error(chalk.red(`✖ ${message}`));
}

/**
 * Displays an informational message to the user.
 * @param {string} message - The message to display.
 */
async function logInfo(message) {
	const chalk = (await import("chalk")).default;
	console.log(chalk.blue(`ℹ ${message}`));
}

/**
 * Displays a warning message to the user.
 * @param {string} message - The message to display.
 */
async function logWarning(message) {
	const chalk = (await import("chalk")).default;
	console.warn(chalk.yellow(`⚠ ${message}`));
}

/**
 * Reads a file asynchronously and returns its contents.
 * @param {string} filePath - The path to the file.
 * @returns {Promise<string>} - A promise that resolves with the file content.
 */
function readFileAsync(filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, "utf8", (err, data) => {
			if (err) {
				reject(`Error reading file: ${err}`);
			} else {
				resolve(data);
			}
		});
	});
}

/**
 * Writes content to a file asynchronously.
 * @param {string} filePath - The path to the file.
 * @param {string} content - The content to write to the file.
 * @returns {Promise<void>}
 */
function writeFileAsync(filePath, content) {
	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, content, "utf8", (err) => {
			if (err) {
				reject(`Error writing to file: ${err}`);
			} else {
				resolve();
			}
		});
	});
}

/**
 * Prompts the user for input with a default value.
 * @param {string} prompt - The prompt message.
 * @param {string} defaultValue - The default value if the user doesn't provide an input.
 * @returns {Promise<string>} - The user input, or the default value.
 */
async function promptForInput(prompt, defaultValue = "") {
	const input = await askQuestion(`${prompt} (default: ${defaultValue}): `);
	return input.trim() || defaultValue;
}

/**
 * Creates a new directory if it doesn't exist.
 * @param {string} dirPath - The path to the directory.
 * @returns {Promise<void>}
 */
function createDirIfNotExists(dirPath) {
	return new Promise((resolve, reject) => {
		fs.mkdir(dirPath, { recursive: true }, (err) => {
			if (err) {
				reject(`Error creating directory: ${err}`);
			} else {
				resolve();
			}
		});
	});
}

/**
 * Removes a file if it exists.
 * @param {string} filePath - The path to the file.
 * @returns {Promise<void>}
 */
function removeFileIfExists(filePath) {
	return new Promise((resolve, reject) => {
		fs.unlink(filePath, (err) => {
			if (err && err.code !== "ENOENT") {
				reject(`Error removing file: ${err}`);
			} else {
				resolve();
			}
		});
	});
}

// Export all functions
module.exports = {
	parseArgs,
	askQuestion,
	logSuccess,
	logError,
	logInfo,
	logWarning,
	readFileAsync,
	writeFileAsync,
	promptForInput,
	createDirIfNotExists,
	removeFileIfExists,
};
