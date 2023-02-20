const useTheme = () => {

    const theme = useState('theme', () => 'neptune')

    const _themes = [
        'neptune',
        'mars',
        'titan'
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