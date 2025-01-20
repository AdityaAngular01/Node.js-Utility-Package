/**
 * Checks if a value is a non-empty string.
 * @param {string} value - The string to validate.
 * @returns {boolean}
 */
function isNonEmptyString(value) {
	return typeof value === "string" && value.trim().length > 0;
}

/**
 * Checks if a string is a valid email address.
 * @param {string} email - The email to validate.
 * @returns {boolean}
 */
function isValidEmail(email) {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	return emailRegex.test(email);
}

/**
 * Checks if a value is a valid date.
 * @param {Date | string} date - The date to validate.
 * @returns {boolean}
 */
function isValidDate(date) {
	const d = new Date(date);
	return !isNaN(d.getTime());
}

/**
 * Checks if a value is a valid integer.
 * @param {any} value - The value to check.
 * @returns {boolean}
 */
function isInteger(value) {
	return Number.isInteger(value);
}

/**
 * Checks if a number is positive.
 * @param {number} value - The value to check.
 * @returns {boolean}
 */
function isPositiveNumber(value) {
	return typeof value === "number" && value > 0;
}

/**
 * Checks if a number falls within a given range.
 * @param {number} value - The value to check.
 * @param {number} min - The minimum allowable value.
 * @param {number} max - The maximum allowable value.
 * @returns {boolean}
 */
function isInRange(value, min, max) {
	return typeof value === "number" && value >= min && value <= max;
}

/**
 * Checks if an object has the required properties.
 * @param {Object} obj - The object to check.
 * @param {Array} requiredProperties - List of required property names.
 * @returns {boolean}
 */
function hasRequiredProperties(obj, requiredProperties) {
	if (typeof obj !== "object" || obj === null) return false;
	return requiredProperties.every((prop) => obj.hasOwnProperty(prop));
}

/**
 * Checks if an array has a minimum length.
 * @param {Array} arr - The array to check.
 * @param {number} minLength - The minimum length of the array.
 * @returns {boolean}
 */
function isArrayLengthValid(arr, minLength) {
	return Array.isArray(arr) && arr.length >= minLength;
}

// Export all validation functions
module.exports = {
	isNonEmptyString,
	isValidEmail,
	isValidDate,
	isInteger,
	isPositiveNumber,
	isInRange,
	hasRequiredProperties,
	isArrayLengthValid,
};
