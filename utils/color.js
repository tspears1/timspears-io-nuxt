const hexToRGB = (hex) => {
    if ( !hex || hex.length != 7 ) { return }

    const red = parseInt(hex.substring(1, 3), 16)
    const green = parseInt(hex.substring(3, 5), 16)
    const blue = parseInt(hex.substring(5, 7), 16)

    return [red, green, blue]
}

export { hexToRGB }
