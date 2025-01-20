const crypto = require("crypto");

/**
 * Hashes a given string using SHA-256.
 * @param {string} data - The data to hash.
 * @returns {string} - The resulting hash in hexadecimal format.
 */
function sha256(data) {
	return crypto.createHash("sha256").update(data).digest("hex");
}

/**
 * Hashes a given string using SHA-512.
 * @param {string} data - The data to hash.
 * @returns {string} - The resulting hash in hexadecimal format.
 */
function sha512(data) {
	return crypto.createHash("sha512").update(data).digest("hex");
}

/**
 * Encrypts a given text using AES-256-CBC algorithm.
 * @param {string} text - The text to encrypt.
 * @param {string} secretKey - The secret key for encryption.
 * @param {string} iv - The initialization vector (IV).
 * @returns {string} - The encrypted text in hexadecimal format.
 */
function encryptAES256(text, secretKey, iv) {
	const cipher = crypto.createCipheriv(
		"aes-256-cbc",
		Buffer.from(secretKey, "hex"),
		Buffer.from(iv, "hex")
	);
	let encrypted = cipher.update(text, "utf8", "hex");
	encrypted += cipher.final("hex");
	return encrypted;
}

/**
 * Decrypts a given text using AES-256-CBC algorithm.
 * @param {string} encryptedText - The encrypted text to decrypt.
 * @param {string} secretKey - The secret key for decryption.
 * @param {string} iv - The initialization vector (IV).
 * @returns {string} - The decrypted text.
 */
function decryptAES256(encryptedText, secretKey, iv) {
	const decipher = crypto.createDecipheriv(
		"aes-256-cbc",
		Buffer.from(secretKey, "hex"),
		Buffer.from(iv, "hex")
	);
	let decrypted = decipher.update(encryptedText, "hex", "utf8");
	decrypted += decipher.final("utf8");
	return decrypted;
}

/**
 * Generates a random string of a given length.
 * @param {number} length - The length of the random string.
 * @returns {string} - The generated random string.
 */
function generateRandomString(length) {
	return crypto.randomBytes(length).toString("hex");
}

/**
 * Generates a random 256-bit (32-byte) key for AES encryption.
 * @returns {string} - The generated key in hexadecimal format.
 */
function generateAESKey() {
	return crypto.randomBytes(32).toString("hex");
}

/**
 * Generates a random initialization vector (IV) for AES encryption.
 * @returns {string} - The generated IV in hexadecimal format.
 */
function generateIV() {
	return crypto.randomBytes(16).toString("hex");
}

/**
 * HMAC (Hash-based Message Authentication Code) using SHA-256.
 * @param {string} data - The data to hash.
 * @param {string} secretKey - The secret key used for HMAC.
 * @returns {string} - The resulting HMAC in hexadecimal format.
 */
function hmacSHA256(data, secretKey) {
	return crypto.createHmac("sha256", secretKey).update(data).digest("hex");
}

/**
 * Verifies the integrity of data using HMAC-SHA256.
 * @param {string} data - The data to verify.
 * @param {string} secretKey - The secret key used for HMAC.
 * @param {string} providedHmac - The provided HMAC to verify against.
 * @returns {boolean} - True if the HMAC matches, false otherwise.
 */
function verifyHmacSHA256(data, secretKey, providedHmac) {
	const computedHmac = hmacSHA256(data, secretKey);
	return computedHmac === providedHmac;
}

/**
 * Generates a random secure token (e.g., for use in password reset, etc.).
 * @param {number} length - The length of the token.
 * @returns {string} - The generated secure token.
 */
function generateSecureToken(length) {
	return crypto.randomBytes(length).toString("base64");
}

// Export all functions
module.exports = {
	sha256,
	sha512,
	encryptAES256,
	decryptAES256,
	generateRandomString,
	generateAESKey,
	generateIV,
	hmacSHA256,
	verifyHmacSHA256,
	generateSecureToken,
};
