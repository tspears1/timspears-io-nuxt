// Author: https://github.com/juliangarnier/anime
/* eslint-disable no-prototype-builtins */
const stringContains = (str, text) => {
    return str.indexOf(text) > -1
}

const is = {
    arr: a => Array.isArray(a),
    obj: a => stringContains(Object.prototype.toString.call(a), 'Object'),
    pth: a => is.obj(a) && a.hasOwnProperty('totalLength'),
    svg: a => a instanceof SVGElement,
    inp: a => a instanceof HTMLInputElement,
    dom: a => a.nodeType || is.svg(a),
    str: a => typeof a === 'string',
    fnc: a => typeof a === 'function',
    und: a => typeof a === 'undefined',
    nil: a => is.und(a) || a === null,
    hex: a => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a),
    rgb: a => /^rgb/.test(a),
    hsl: a => /^hsl/.test(a),
    col: a => (is.hex(a) || is.rgb(a) || is.hsl(a)),
    dec: a => a % 1 !== 0,
    empty: a => !Object.keys(a).length,
    // key: a => !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== 'targets' && a !== 'keyframes',
}

const ratioStringToNumber = (ratio, seperator = ':') => {
    const ratioArray = ratio.split(seperator).map(Number)
    return (ratioArray[0] / ratioArray[1]).toFixed(2)
}

export { is, stringContains, ratioStringToNumber }
