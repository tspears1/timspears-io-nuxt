import Values from 'values.js'
import Gradient from 'javascript-color-gradient'
import { unique } from 'radash'

const useThemes = () => {
    const { data } = useSanityQuery(groq`
        *[_type == 'theme']{
            title,
            'slug': slug.current,
            color,
            invert
        }
    `)

    const activeTheme = useState('activeTheme', () => ({
        name: 'Base',
        slug: 'base',
        base: '#000',
        palette: [],
    }))
    const setActiveTheme = (theme) => activeTheme.value = themes.value.filter(t => t.slug == theme)[0]
    const themes = useState('themes', () => [])

    const buildThemes = () => {
        if ( data.value ) {
            data.value.forEach((_theme) => {
                const { palette }   = generateGradientPalette(_theme.color.hex, _theme.invert ? _theme.invert.hext : null )
                const updatedThemes = [...themes.value, {
                    name: _theme.title,
                    slug: _theme.slug ?? null,
                    base: _theme.color.hex,
                    palette,
                }]
                themes.value = unique(updatedThemes, t => t.slug)
            })
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
    }

    return {
        themes,
        buildThemes,
        buildStyleSheet,
        cssVars,
        activeTheme,
        setActiveTheme,
        generateInvert,
        generateGradientPalette,
    }
}

export { useThemes }