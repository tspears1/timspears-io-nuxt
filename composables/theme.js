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

    // watch(theme, (value) => {
    //     useHead({
    //         meta: [{ name: 'theme-color', content: '#0C4F75' }] // add to new useTheme state.
    //     })
    // })

    return {
        theme,
        setTheme,
    }
}

export { useTheme }