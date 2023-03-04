const useTheme = () => {

    const theme = useState('theme', () => 'laconia')



    const themes = {
        laconia:      '#B2841C',
        neptune:      '#0C4F75',
        mars:         '#38121A',
        titan:        '#171C1C',
        // ceres:        '#000',
        // tycho:        '#000',
        // eros:         '#000',
        // phoebe:       '#000',
        // ganymede:     '#000',
        // luna:         '#000',
    }

    const _registeredTheme = (theme) => Object.keys(themes).includes(theme)

    const setTheme = (newTheme) => {
        if (_registeredTheme(newTheme))
            theme.value = newTheme
        else
            console.warn(`Theme: ${newTheme} is not registered.`)
    }

    return {
        theme,
        themes,
        setTheme,
    }
}

export { useTheme }