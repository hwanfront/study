/**
 * @typedef {Object} Play
 * @property {string} name
 * @property {string} type
 */

/**
 * @typedef {Object} Perf
 * @property {string} playId
 * @property {number} audience 
 */

/**
 * @typedef {Perf & { play: Play, amount: number, volumeCredits: number }} MyPerf
 */

/** 
 * @typedef {Object} Invoice
 * @property {string} customer
 * @property {Perf[]} performances
 */

/**
 * @typedef {Object} StatementData
 * @property {string} customer
 * @property {MyPerf[]} performances
 * @property {number} totalAmount
 * @property {number} totalVolumeCredits
 */