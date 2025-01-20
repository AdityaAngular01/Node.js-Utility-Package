/**
 * Wraps a function that returns a promise and catches any errors.
 * @param {Function} fn - The function that returns a promise.
 * @returns {Promise<[any, Error]>} - A promise that resolves with an array where the first element is the result, and the second element is the error (if any).
 */
function wrapPromise(fn) {
	return fn().then(
		(result) => [result, null],
		(error) => [null, error]
	);
}

/**
 * Waits for all promises to resolve and returns an array of results.
 * If any promise rejects, it will return the error.
 * @param {Array<Promise>} promises - An array of promises.
 * @returns {Promise<Array>} - A promise that resolves with an array of results or errors.
 */
async function allPromises(promises) {
	const results = await Promise.allSettled(promises);
	return results.map((result) =>
		result.status === "fulfilled" ? result.value : result.reason
	);
}

/**
 * Waits for the first promise to resolve or reject, and returns the result or error.
 * @param {Array<Promise>} promises - An array of promises.
 * @returns {Promise<any>} - A promise that resolves with the result of the first resolved or rejected promise.
 */
function firstPromise(promises) {
	return Promise.race(promises);
}

/**
 * Creates a promise that rejects after a timeout.
 * @param {number} ms - The timeout duration in milliseconds.
 * @param {string} message - The error message for the rejection.
 * @returns {Promise} - A promise that rejects after the specified time.
 */
function promiseTimeout(ms, message = "Timeout exceeded") {
	return new Promise((_, reject) => {
		setTimeout(() => reject(new Error(message)), ms);
	});
}

/**
 * Delays the resolution of a promise by a specified number of milliseconds.
 * @param {number} ms - The delay duration in milliseconds.
 * @returns {Promise} - A promise that resolves after the specified delay.
 */
function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Resolves a promise after a delay, useful for retrying failed promises.
 * @param {Function} fn - The function that returns a promise.
 * @param {number} retries - The number of times to retry.
 * @param {number} delayMs - The delay between retries in milliseconds.
 * @returns {Promise} - A promise that resolves or rejects after the specified retries and delays.
 */
async function retryPromise(fn, retries = 3, delayMs = 1000) {
	let attempt = 0;
	while (attempt <= retries) {
		try {
			return await fn();
		} catch (error) {
			if (attempt === retries) {
				throw error;
			}
			attempt++;
			await delay(delayMs);
		}
	}
}

// Export all functions
module.exports = {
	wrapPromise,
	allPromises,
	firstPromise,
	promiseTimeout,
	delay,
	retryPromise,
};
