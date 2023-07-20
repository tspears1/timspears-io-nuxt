const validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective', 'matrix', 'matrix3d']

const getPlaybackPos = (time, duration) => ((time * 100) / duration) * 0.01

/**
 * Gets computed translate values
 * @param {HTMLElement} element
 * @returns {Object}
 */
const getTranslateValues = (element, individualProp) => {
    const style = window.getComputedStyle(element)
    // eslint-disable-next-line dot-notation
    const matrix = style['transform'] || style.webkitTransform || style.mozTransform
    const indies = {
        translate: style['translate'] || style.webkitTranslate || style.mozTranslate,
        rotate: style['rotate'] || style.webkitRotate || style.mozRotate,
        scale: style['scale'] || style.webkitScale || style.mozScale,
    }

    if (individualProp) {
        const values = Array.from(indies[individualProp].split(' ')).map(x => parseFloat(x))
        if (individualProp === 'translate' || individualProp === 'scale') {
            return {
                x: values[0],
                y: values[1],
                z: values[2],
            }
        }

        if (individualProp === 'rotate') {
            if (values.length == 1) {
                return {
                    z: values[0],
                }
            }

            if (values.legth == 2) {
                return {
                    [values[0]]: values[1]
                }
            }
        }
    }

    // No transform property. Simply return 0 values.
    if (matrix === 'none' || typeof matrix === 'undefined') {
        return {
            x: 0,
            y: 0,
            z: 0,
        }
    }

    // Can either be 2d or 3d transform
    const matrixType = matrix.includes('3d') ? '3d' : '2d'
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ').map(x => parseFloat(x))

    // 2d matrices have 6 values
    // Last 2 values are X and Y.
    // 2d matrices does not have Z value.
    if (matrixType === '2d') {
        return {
            x: matrixValues[4],
            y: matrixValues[5],
            z: 0,
        }
    }

    // 3d matrices have 16 values
    // The 13th, 14th, and 15th values are X, Y, and Z
    if (matrixType === '3d') {
        return {
            x: matrixValues[12],
            y: matrixValues[13],
            z: matrixValues[14],
        }
    }
}

export { getPlaybackPos, getTranslateValues, validTransforms }
