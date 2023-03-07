import Values from 'values.js'
import Gradient from 'javascript-color-gradient'
import { unique } from 'radash'

const useThemes = () => {
    const { data: themeData } = useSanityQuery(groq`
        *[_type == 'theme']{
            title,
            'slug': slug.current,
            color,
            invert
        }
    `)

    const { data: entryData } = useSanityQuery(groq`
        *[_type in ['home', 'page', 'work']]{
            _type,
            'slug': slug.current,
            'theme': pageTheme->slug.current
        }
    `)

    const baseTheme = {
        name: 'Base',
        slug: 'base',
        base: '#000',
        palette: [
            '#000000',
            '#010101',
            '#121212',
            '#343434',
            '#565656',
            '#787878',
            '#9A9A9A',
            '#ABABAB',
            '#CDCDCD',
            '#DEDEDE',
            '#EFEFEF',
            '#FFFFFF',
        ],
    }

    const activeTheme = useState('activeTheme', () => ({...baseTheme}))
    const themes      = useState('themes', () => [{...baseTheme}])
    const themeIndex  = useState('themeIndex', () => [{}])

    const setActiveTheme = (theme) => activeTheme.value = themes.value.filter(t => t.slug == theme)[0]
    const getEntryThemeIndex = (entry) => themeIndex.value.filter(t => t.name == entry.name)[0]

    const buildThemes = () => {
        if ( themeData.value ) {
            themeData.value.forEach((_theme) => {
                const { palette }   = generateGradientPalette(_theme.color.hex, _theme.invert ? _theme.invert.hext : null )
                const updatedThemes = [...themes.value, {
                    name: _theme.title,
                    slug: _theme.slug ?? null,
                    base: _theme.color.hex,
                    palette,
                }]
                themes.value = unique(updatedThemes, t => t.slug)
            })
            console.warn('Themes Built')
            return themes
        }
    }

    const generateInvert = (base) => {
        const tints = base.tints(10).map((tint) => `#${tint.hex}`)
        return tints[tints.length - 2]
    }

    const generateGradientPalette = (base, invert = null) => {
        const _base       = new Values(base)
        const _baseHex    = `#${_base.hex}`
        const _invertHex  = invert ?? generateInvert(_base)
        const _tint       = new Values(_invertHex).tints(12).map((tint) => `#${tint.hex}`)[2]
        const _shade      = _base.shades(12).map((shade) => `#${shade.hex}`)[0]
        const _gradient   = new Gradient()
                                .setColorGradient(_baseHex, _invertHex)
                                .setMidpoint(10)
                                .getColors()
        const palette    = [_shade, _baseHex, ..._gradient.slice(1, -1), _invertHex, _tint]

        return { palette }
    }

    const cssVars = computed(() => themes.value.map(theme => {
        return {
            name: theme.slug,
            colors: theme.palette.map((color, index) => {
                return `--c-theme-${theme.slug}-${pad(index + 1, '00')}: ${color};`
            }),
            colorsRGB: theme.palette.map((color, index) => {
                const rgb = new Values(color).rgb.join(', ')
                return `--c-theme-${theme.slug}-${pad(index + 1, '00')}-rgb: ${rgb};`
            }),
            themeColors: theme.palette.map((color, index) => {
                return `--c-theme-${pad(index + 1, '00')}: var(--c-theme-${theme.slug}-${pad(index + 1, '00')});`
            }),
            themeColorsRGB: theme.palette.map((color, index) => {
                return `--c-theme-${pad(index + 1, '00')}-rgb: var(--c-theme-${theme.slug}-${pad(index + 1, '00')}-rgb);`
            })

        }
    }))

    const buildStyleSheet = () => {
        const head = document.head
        const styleEl = document.createElement('style')

        styleEl.prepend(`
            :root {
                ${ cssVars.value.map(theme => theme.colors.join("\n")).join("\n")}
                ${ cssVars.value.map(theme => theme.colorsRGB.join("\n")).join("\n")}
            }
        `)

        const themeVariables = cssVars.value.map(theme => {
            return `
                [data-theme="${theme.name}"] {
                    ${theme.themeColors.join("\n")}
                    ${theme.themeColorsRGB.join("\n")}
                }
            `
        }).join("\n")

        styleEl.append(themeVariables)
        head.append(styleEl)
        console.warn('Theme Stylesheet Loaded')
        return
    }

    const getEntrySlug = (entry) => {
        switch (entry._type) {
            case 'home': return '/'
                break
            case 'work': return `/work/${entry.slug}`
                break
            default: return `/${entry.slug}`
                break
        }
    }

    const buildThemeIndex = () => {
        themeIndex.value = entryData.value.map((entry) => ({
                name: entry.slug ?? 'index',
                slug: getEntrySlug(entry),
                theme: entry.theme
        }))
    }

    return {
        themes,
        buildThemes,
        buildThemeIndex,
        buildStyleSheet,
        cssVars,
        activeTheme,
        setActiveTheme,
        getEntryThemeIndex,
        generateInvert,
        generateGradientPalette,
    }
}

export { useThemes }