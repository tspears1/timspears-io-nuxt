const getAttribute = (el, prop) => el.getAttribute(prop)

const setAttribute = (el, prop, value) => el.setAttribute(prop, value)

const getDistance = (p1, p2) => Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))

const getCircleLength = (el) => Math.PI * 2 * getAttribute(el, 'r')

const getRectLength = (el) => (getAttribute(el, 'width') * 2) + (getAttribute(el, 'height') * 2)

const getLineLength = (el) => {
    return getDistance(
        { x: getAttribute(el, 'x1'), y: getAttribute(el, 'y1') },
        { x: getAttribute(el, 'x2'), y: getAttribute(el, 'y2') }
    )
}

// changed for loop to foreach- fyi if it breaks
const getPolylineLength = (el) => {
    const points = el.points
    let totalLength = 0
    let previousPos
    points.numberOfItems.forEach((i) => {
        const currentPos = points.getItem(i)
        if (i > 0) totalLength += getDistance(previousPos, currentPos)
        previousPos = currentPos
    })
    return totalLength
}

const getPolygonLength = (el) => {
    const points = el.points
    return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0))
}

const getTotalLength = (el) => {
    if (el.getTotalLength) return el.getTotalLength()
    switch (el.tagName.toLowerCase()) {
    case 'circle': return getCircleLength(el)
    case 'rect': return getRectLength(el)
    case 'line': return getLineLength(el)
    case 'polyline': return getPolylineLength(el)
    case 'polygon': return getPolygonLength(el)
    }
}

const setDashoffset = (el) => {
    if (el.tagName.toLowerCase() === 'svg') {
        let offsets = []
        Array.from(el.children).forEach((child) => {
            const pathLength = getTotalLength(child)
            child.setAttribute('stroke-dasharray', pathLength)
            offsets = [...offsets, pathLength]
        })
        return offsets
    }

    const pathLength = getTotalLength(el)
    // el.setAttribute('stroke-dasharray', pathLength)
    el.style.strokeDasharray = pathLength
    return pathLength
}

const draw = (offset, reverse = false) => ({
    // This property makes the line "draw" in when animated
    strokeDashoffset: reverse ? [offset, offset * 2] : [offset, 0],
    opacity: [0, 1],
    // Each line will be hidden until it starts drawing
    // to fix a bug in Safari where the line can be
    // partially visible even when progress is at 0
    visibility: 'visible',
})

export { getAttribute, setAttribute, setDashoffset, draw }
