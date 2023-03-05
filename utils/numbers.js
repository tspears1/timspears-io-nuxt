const pad = (n, before = '0') => (before + n).slice((before.length + 1) * -1)

export { pad }