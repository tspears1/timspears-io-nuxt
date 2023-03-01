const useTheme = () => {

    const theme = useState('theme', () => 'laconia')

    const _themes = {
        laconia:      '#B2841C',
        neptune:      '#0C4F75',
        mars:         '#000',
        titan:        '#000',
        ceres:        '#000',
        tycho:        '#000',
        eros:         '#000',
        phoebe:       '#000',
        ganymede:     '#000',
        luna:         '#000',
    }

    const _registeredTheme = (theme) => Object.keys(_themes).includes(theme)

    const setTheme = (newTheme) => {
        if (_registeredTheme(newTheme))
            theme.value = newTheme
        else
            console.warn(`Theme: ${newTheme} is not registered.`)
    }

    watch(theme, (value) => {
        useHead({
            meta: [{ name: 'theme-color', content: _themes[theme.value] }]
        })

        console.warn(`[Head - Meta]: Theme color changed: ${_themes[theme.value]}`)
    })

    return {
        theme,
        setTheme,
    }
}

export { useTheme }