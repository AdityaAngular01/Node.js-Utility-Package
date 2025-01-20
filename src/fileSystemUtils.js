const fs = require("fs");
const path = require("path");

/**
 * Checks if a file exists.
 * @param {string} filePath - The path to the file.
 * @returns {boolean}
 */
function fileExists(filePath) {
	try {
		return fs.existsSync(filePath);
	} catch (err) {
		console.error(err);
		return false;
	}
}

/**
 * Reads a file asynchronously.
 * @param {string} filePath - The path to the file.
 * @returns {Promise<string>}
 */
function readFile(filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, "utf8", (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
}

/**
 * Writes data to a file asynchronously.
 * @param {string} filePath - The path to the file.
 * @param {string} data - The data to write.
 * @returns {Promise<void>}
 */
function writeFile(filePath, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, data, "utf8", (err) => {
			if (err) reject(err);
			else resolve();
		});
	});
}

/**
 * Appends data to a file asynchronously.
 * @param {string} filePath - The path to the file.
 * @param {string} data - The data to append.
 * @returns {Promise<void>}
 */
function appendToFile(filePath, data) {
	return new Promise((resolve, reject) => {
		fs.appendFile(filePath, data, "utf8", (err) => {
			if (err) reject(err);
			else resolve();
		});
	});
}

/**
 * Deletes a file.
 * @param {string} filePath - The path to the file.
 * @returns {Promise<void>}
 */
function deleteFile(filePath) {
	return new Promise((resolve, reject) => {
		fs.unlink(filePath, (err) => {
			if (err) reject(err);
			else resolve();
		});
	});
}

/**
 * Creates a directory.
 * @param {string} dirPath - The path to the directory.
 * @returns {Promise<void>}
 */
function createDirectory(dirPath) {
	return new Promise((resolve, reject) => {
		fs.mkdir(dirPath, { recursive: true }, (err) => {
			if (err) reject(err);
			else resolve();
		});
	});
}

/**
 * Reads the contents of a directory.
 * @param {string} dirPath - The path to the directory.
 * @returns {Promise<Array<string>>}
 */
function readDirectory(dirPath) {
	return new Promise((resolve, reject) => {
		fs.readdir(dirPath, (err, files) => {
			if (err) reject(err);
			else resolve(files);
		});
	});
}

/**
 * Copies a file from source to destination.
 * @param {string} sourcePath - The source file path.
 * @param {string} destPath - The destination file path.
 * @returns {Promise<void>}
 */
function copyFile(sourcePath, destPath) {
	return new Promise((resolve, reject) => {
		fs.copyFile(sourcePath, destPath, (err) => {
			if (err) reject(err);
			else resolve();
		});
	});
}

/**
 * Moves a file from source to destination.
 * @param {string} sourcePath - The source file path.
 * @param {string} destPath - The destination file path.
 * @returns {Promise<void>}
 */
function moveFile(sourcePath, destPath) {
	return new Promise((resolve, reject) => {
		fs.rename(sourcePath, destPath, (err) => {
			if (err) reject(err);
			else resolve();
		});
	});
}

/**
 * Renames a file.
 * @param {string} oldPath - The current file path.
 * @param {string} newPath - The new file path.
 * @returns {Promise<void>}
 */
function renameFile(oldPath, newPath) {
	return new Promise((resolve, reject) => {
		fs.rename(oldPath, newPath, (err) => {
			if (err) reject(err);
			else resolve();
		});
	});
}

/**
 * Gets information about a file.
 * @param {string} filePath - The path to the file.
 * @returns {Promise<fs.Stats>}
 */
function getFileStats(filePath) {
	return new Promise((resolve, reject) => {
		fs.stat(filePath, (err, stats) => {
			if (err) reject(err);
			else resolve(stats);
		});
	});
}

/**
 * Checks if a directory exists.
 * @param {string} dirPath - The path to the directory.
 * @returns {boolean}
 */
function directoryExists(dirPath) {
	try {
		return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
	} catch (err) {
		console.error(err);
		return false;
	}
}

// Export all functions
module.exports = {
	fileExists,
	readFile,
	writeFile,
	appendToFile,
	deleteFile,
	createDirectory,
	readDirectory,
	copyFile,
	moveFile,
	renameFile,
	getFileStats,
	directoryExists,
};
