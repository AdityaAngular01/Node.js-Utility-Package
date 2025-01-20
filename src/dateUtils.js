
const moment = require("moment");
const moment = require("moment-timezone");

/**
 * Formats a date to the specified format.
 * @param {Date | string} date - The date to format.
 * @param {string} format - The format string (e.g., 'YYYY-MM-DD').
 * @returns {string}
 */
function formatDate(date, format = "YYYY-MM-DD") {
	const d = new Date(date);
	if (isNaN(d)) throw new Error("Invalid date provided");
	return moment(d).format(format);
}

/**
 * Calculates the difference between two dates in the specified unit.
 * @param {Date | string} date1 - The first date.
 * @param {Date | string} date2 - The second date.
 * @param {string} unit - The unit of time ('days', 'months', 'years', etc.).
 * @returns {number}
 */
function dateDifference(date1, date2, unit = "days") {
	const d1 = new Date(date1);
	const d2 = new Date(date2);
	if (isNaN(d1) || isNaN(d2)) throw new Error("Invalid dates provided");
	const diff = moment(d1).diff(moment(d2), unit);
	return Math.abs(diff);
}

/**
 * Converts a date to ISO format.
 * @param {Date | string} date
 * @returns {string}
 */
function toISOFormat(date) {
	const d = new Date(date);
	if (isNaN(d)) throw new Error("Invalid date provided");
	return d.toISOString();
}

/**
 * Checks if a given date is in the past.
 * @param {Date | string} date
 * @returns {boolean}
 */
function isPastDate(date) {
	const d = new Date(date);
	if (isNaN(d)) throw new Error("Invalid date provided");
	return d < new Date();
}

/**
 * Checks if a given date is in the future.
 * @param {Date | string} date
 * @returns {boolean}
 */
function isFutureDate(date) {
	const d = new Date(date);
	if (isNaN(d)) throw new Error("Invalid date provided");
	return d > new Date();
}

/**
 * Adds or subtracts time from a date.
 * @param {Date | string} date - The initial date.
 * @param {number} value - The value to add or subtract.
 * @param {string} unit - The unit of time ('days', 'months', 'years', etc.).
 * @returns {string}
 */
function addTime(date, value, unit = "days") {
	const d = new Date(date);
	if (isNaN(d)) throw new Error("Invalid date provided");
	return moment(d).add(value, unit).toDate();
}

/**
 * Formats a date to a human-readable relative time (e.g., '2 days ago').
 * @param {Date | string} date
 * @returns {string}
 */
function toRelativeTime(date) {
	const d = new Date(date);
	if (isNaN(d)) throw new Error("Invalid date provided");
	return moment(d).fromNow();
}

/**
 * Formats a date to the specified format in a specific time zone.
 * @param {Date | string} date - The date to format.
 * @param {string} format - The format string (e.g., 'YYYY-MM-DD').
 * @param {string} timezone - The time zone (e.g., 'Asia/Kolkata').
 * @returns {string}
 */
function formatDateInTimeZone(date, format = 'YYYY-MM-DD', timezone = 'UTC') {
  const d = new Date(date);
  if (isNaN(d)) throw new Error('Invalid date provided');
  return moment(d).tz(timezone).format(format);
}

/**
 * Gets the current time in a specific time zone.
 * @param {string} timezone - The time zone (e.g., 'Asia/Kolkata').
 * @returns {string}
 */
function getCurrentTimeInTimeZone(timezone = 'UTC') {
  return moment.tz(timezone).format('YYYY-MM-DD HH:mm:ss');
}

/**
 * Converts a date from one time zone to another.
 * @param {Date | string} date - The date to convert.
 * @param {string} fromTimezone - The original time zone (e.g., 'UTC').
 * @param {string} toTimezone - The target time zone (e.g., 'Asia/Kolkata').
 * @returns {string}
 */
function convertTimeZone(date, fromTimezone = 'UTC', toTimezone = 'Asia/Kolkata') {
  const d = new Date(date);
  if (isNaN(d)) throw new Error('Invalid date provided');
  return moment(d).tz(fromTimezone).clone().tz(toTimezone).format('YYYY-MM-DD HH:mm:ss');
}

/**
 * Get the time difference between two time zones.
 * @param {string} fromTimezone - The starting time zone (e.g., 'UTC').
 * @param {string} toTimezone - The target time zone (e.g., 'Asia/Kolkata').
 * @returns {string} - The time difference (e.g., '+05:30').
 */
function getTimeZoneDifference(fromTimezone = 'UTC', toTimezone = 'Asia/Kolkata') {
  const offsetFrom = moment.tz(fromTimezone).format('Z');
  const offsetTo = moment.tz(toTimezone).format('Z');
  return `${offsetTo}`;
}

/**
 * Gets the list of available time zones.
 * @returns {Array} - List of time zones.
 */
function getAllTimeZones() {
  return moment.tz.names();
}


// Export all functions
module.exports = {
	formatDate,
	dateDifference,
	toISOFormat,
	isPastDate,
	isFutureDate,
	addTime,
	toRelativeTime,
	formatDateInTimeZone,
	getCurrentTimeInTimeZone,
	convertTimeZone,
	getTimeZoneDifference,
	getAllTimeZones,
};
