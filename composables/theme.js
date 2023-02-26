const useTheme = () => {

    const theme = useState('theme', () => 'laconia')

    const _themes = [
        'laconia',
        'neptune',
        'mars',
        'titan',
        'ceres',
        'tycho',
        'eros',
        'phoebe',
        'ganymede',
        'luna'
    ]

    const _registeredTheme = (theme) => _themes.includes(theme)

    const setTheme = (newTheme) => {
        if (_registeredTheme(newTheme))
            theme.value = newTheme
        else
            console.warn(`Theme: ${newTheme} is not registered.`)
    }

    return {
        theme,
        setTheme,
    }
}

export { useTheme }