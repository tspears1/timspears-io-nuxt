const pad = (n, before = '0') => (before + n).slice((before.length + 1) * -1)

/**
 *
 * @function remToPx
 * @description Convert rem string to pixel number
 * @param {[string, number]} rem
 * @param {number} rootSize
 * @returns {number}
 *
 */
const remToPx = (rem, rootSize = 16) => rem.toString().includes('rem') ? parseFloat(rem) * rootSize : parseFloat(rem)


export { pad, remToPx }