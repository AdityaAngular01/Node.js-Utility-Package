/**
 * Checks if an array contains a specific value.
 * @param {Array} arr - The array to search.
 * @param {any} value - The value to search for.
 * @returns {boolean}
 */
function arrayContains(arr, value) {
	return Array.isArray(arr) && arr.includes(value);
}

/**
 * Removes duplicate values from an array.
 * @param {Array} arr - The array to process.
 * @returns {Array}
 */
function removeDuplicates(arr) {
	if (!Array.isArray(arr)) throw new Error("Input is not an array");
	return [...new Set(arr)];
}

/**
 * Finds the intersection of two arrays.
 * @param {Array} arr1 - The first array.
 * @param {Array} arr2 - The second array.
 * @returns {Array}
 */
function arrayIntersection(arr1, arr2) {
	if (!Array.isArray(arr1) || !Array.isArray(arr2))
		throw new Error("Both inputs must be arrays");
	return arr1.filter((value) => arr2.includes(value));
}

/**
 * Merges two arrays into one.
 * @param {Array} arr1 - The first array.
 * @param {Array} arr2 - The second array.
 * @returns {Array}
 */
function mergeArrays(arr1, arr2) {
	if (!Array.isArray(arr1) || !Array.isArray(arr2))
		throw new Error("Both inputs must be arrays");
	return [...arr1, ...arr2];
}

/**
 * Flattens an array of arrays into a single array.
 * @param {Array} arr - The array of arrays to flatten.
 * @returns {Array}
 */
function flattenArray(arr) {
	if (!Array.isArray(arr)) throw new Error("Input is not an array");
	return arr.flat();
}

/**
 * Checks if an array is empty.
 * @param {Array} arr - The array to check.
 * @returns {boolean}
 */
function isArrayEmpty(arr) {
	return Array.isArray(arr) && arr.length === 0;
}

/**
 * Checks if an object is empty.
 * @param {Object} obj - The object to check.
 * @returns {boolean}
 */
function isObjectEmpty(obj) {
	return obj && Object.keys(obj).length === 0;
}

/**
 * Deep clones an object.
 * @param {Object} obj - The object to clone.
 * @returns {Object}
 */
function deepCloneObject(obj) {
	return JSON.parse(JSON.stringify(obj));
}

/**
 * Merges two objects into one.
 * @param {Object} obj1 - The first object.
 * @param {Object} obj2 - The second object.
 * @returns {Object}
 */
function mergeObjects(obj1, obj2) {
	return { ...obj1, ...obj2 };
}

/**
 * Filters object properties based on a condition.
 * @param {Object} obj - The object to filter.
 * @param {Function} condition - The condition function to test each property.
 * @returns {Object}
 */
function filterObjectProperties(obj, condition) {
	if (typeof condition !== "function")
		throw new Error("Condition must be a function");
	return Object.fromEntries(
		Object.entries(obj).filter(([key, value]) => condition(key, value))
	);
}

/**
 * Checks if an object has a specific property.
 * @param {Object} obj - The object to check.
 * @param {string} prop - The property to check for.
 * @returns {boolean}
 */
function objectHasProperty(obj, prop) {
	return obj && Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * Gets the keys of an object.
 * @param {Object} obj - The object to get keys from.
 * @returns {Array}
 */
function getObjectKeys(obj) {
	return obj ? Object.keys(obj) : [];
}

/**
 * Gets the values of an object.
 * @param {Object} obj - The object to get values from.
 * @returns {Array}
 */
function getObjectValues(obj) {
	return obj ? Object.values(obj) : [];
}

// Export all array and object functions
module.exports = {
	arrayContains,
	removeDuplicates,
	arrayIntersection,
	mergeArrays,
	flattenArray,
	isArrayEmpty,
	isObjectEmpty,
	deepCloneObject,
	mergeObjects,
	filterObjectProperties,
	objectHasProperty,
	getObjectKeys,
	getObjectValues,
};
