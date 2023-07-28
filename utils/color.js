import chroma from 'chroma-js'

const hexToRGB = (hex) => {
    if ( !hex || hex.length != 7 ) { return }

    const red = parseInt(hex.substring(1, 3), 16)
    const green = parseInt(hex.substring(3, 5), 16)
    const blue = parseInt(hex.substring(5, 7), 16)

    return [red, green, blue]
}

const convertHSL = (color) => {
    let _hsl = chroma(color).hsl()
    return `${Math.round(_hsl[0] || 0)} ${Math.round(_hsl[1] * 100)}% ${Math.round(_hsl[2] * 100)}%`
}

const colorScale = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 ]

export { hexToRGB, colorScale, convertHSL }
