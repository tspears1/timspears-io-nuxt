const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b

// Map number x from range [min1, max1] to [min2, max2]
const rangeScale = (x, min1, max1, min2, max2) => (x - min1) * (max2 - min2) / (max1 - min1) + min2

const invert = (x) => x * -1

export { getRandomNumber, lerp, rangeScale, invert }
