/**
 * Converts a string to camelCase.
 * @param {string} str
 * @returns {string}
 */
function toCamelCase(str) {
	return str
		.toLowerCase()
		.replace(/[^a-zA-Z0-9]+(.)/g, (match, char) => char.toUpperCase());
}

/**
 * Converts a string to snake_case.
 * @param {string} str
 * @returns {string}
 */
function toSnakeCase(str) {
	return str.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "_");
}

/**
 * Converts a string to kebab-case.
 * @param {string} str
 * @returns {string}
 */
function toKebabCase(str) {
	return str.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
}

/**
 * Trims extra spaces from the start and end of a string.
 * @param {string} str
 * @returns {string}
 */
function trimWhitespace(str) {
	return str.trim();
}

/**
 * Removes special characters from a string.
 * @param {string} str
 * @returns {string}
 */
function removeSpecialChars(str) {
	return str.replace(/[^a-zA-Z0-9 ]/g, "");
}

/**
 * Converts a string to a URL-friendly slug.
 * @param {string} str
 * @returns {string}
 */
function slugify(str) {
	return str
		.toLowerCase()
		.trim()
		.replace(/[^a-zA-Z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

/**
 * Reverses the characters in a string.
 * @param {string} str
 * @returns {string}
 */
function reverseString(str) {
	return str.split("").reverse().join("");
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalizes the first letter of each word in a string.
 * @param {string} str
 * @returns {string}
 */
function capitalizeWords(str) {
	return str
		.split(" ")
		.map((word) => capitalizeFirstLetter(word))
		.join(" ");
}

/**
 * Counts the number of occurrences of a specific character in a string.
 * @param {string} str
 * @param {string} char
 * @returns {number}
 */
function charCount(str, char) {
	return str.split(char).length - 1;
}

/**
 * Checks if a string is a palindrome.
 * @param {string} str
 * @returns {boolean}
 */
function isPalindrome(str) {
	const reversed = reverseString(str);
	return str === reversed;
}

// Export all functions
module.exports = {
	toCamelCase,
	toSnakeCase,
	toKebabCase,
	trimWhitespace,
	removeSpecialChars,
	slugify,
	reverseString,
	capitalizeFirstLetter,
	capitalizeWords,
	charCount,
	isPalindrome,
};
