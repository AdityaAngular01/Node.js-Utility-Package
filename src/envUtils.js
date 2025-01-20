const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
/**
 * Loads environment variables from a .env file into process.env.
 * @param {string} envFile - The path to the .env file (default is '.env').
 * @returns {void}
 */
function loadEnvVariables(envFile = ".env") {
	const envPath = path.resolve(process.cwd(), envFile);
	if (fs.existsSync(envPath)) {
		dotenv.config({ path: envPath });
		console.log(`Environment variables loaded from ${envPath}`);
	} else {
		console.warn(`No .env file found at ${envPath}`);
	}
}

/**
 * Get an environment variable by key with an optional fallback.
 * @param {string} key - The environment variable key.
 * @param {string} fallback - The fallback value if the variable is not found.
 * @returns {string} - The environment variable or the fallback value.
 */

function getEnvVariable(key, fallback = undefined) {
	const value = process.env[key];
	if (!value && fallback === undefined) {
		throw new Error(
			`Environment variable "${key}" is not set and no default value was provided.`
		);
	}
	return value || fallback;
}

/**
 * Validates if all required environment variables are set.
 * @param {Array<string>} requiredKeys - An array of environment variable keys to validate.
 * @throws {Error} Throws an error if any of the required environment variables are missing.
 */
function validateEnvVariables(requiredKeys) {
  requiredKeys.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
}

/**
 * Checks if the current environment is production.
 * @returns {boolean} - True if the environment is 'production'.
 */
function isProduction() {
	return process.env.NODE_ENV === "production";
}

/**
 * Checks if the current environment is development.
 * @returns {boolean} - True if the environment is 'development'.
 */
function isDevelopment() {
	return process.env.NODE_ENV === "development";
}

/**
 * Checks if the current environment is testing.
 * @returns {boolean} - True if the environment is 'testing'.
 */
function isTesting() {
	return process.env.NODE_ENV === "testing";
}

/**
 * Sets an environment variable dynamically.
 * @param {string} key - The environment variable key.
 * @param {string} value - The value to assign to the environment variable.
 * @returns {void}
 */
function setEnvVariable(key, value) {
	process.env[key] = value;
}

/**
 * Removes an environment variable.
 * @param {string} key - The environment variable key.
 * @returns {void}
 */
function removeEnvVariable(key) {
	delete process.env[key];
}

/**
 * Checks if an environment variable exists.
 * @param {string} key - The environment variable key.
 * @returns {boolean} - True if the environment variable exists.
 */
function hasEnvVariable(key) {
	return process.env.hasOwnProperty(key);
}

/**
 * Reads a JSON configuration file and merges it with environment variables.
 * @param {string} configFile - The path to the configuration file (e.g., config.json).
 * @returns {object} - The merged configuration object.
 */
function loadConfigFromFile(configFile) {
	try {
		const config = JSON.parse(fs.readFileSync(configFile, "utf8"));
		Object.keys(config).forEach((key) => {
			if (!hasEnvVariable(key)) {
				setEnvVariable(key, config[key]);
			}
		});
		console.log(`Config loaded from ${configFile}`);
		return config;
	} catch (error) {
		console.error(
			`Failed to load configuration from ${configFile}:`,
			error
		);
		return {};
	}
}

/**
 * Gets the environment configuration based on the current environment.
 * @returns {object} - Configuration object for the current environment (e.g., dev, prod).
 */
function getEnvConfig() {
	const env = process.env.NODE_ENV || "development";
	try {
		const config = JSON.parse(
			fs.readFileSync(
				path.resolve(__dirname, `${env}.config.json`),
				"utf8"
			)
		);
		console.log(`Config loaded for ${env} environment`);
		return config;
	} catch (error) {
		console.error(
			`Failed to load configuration for ${env} environment:`,
			error
		);
		return {};
	}
}

// Export all functions
module.exports = {
	loadEnvVariables,
	getEnvVariable,
    validateEnvVariables,
	isProduction,
	isDevelopment,
	isTesting,
	setEnvVariable,
	removeEnvVariable,
	hasEnvVariable,
	loadConfigFromFile,
	getEnvConfig,
};
