import Values from 'values.js'
import Gradient from 'javascript-color-gradient'
import { unique } from 'radash'

import { colorScale, convertHSL } from '../utils/color'

const useThemes = () => {

    // SETUP =============================================================
    const { data: themeData } = useSanityQuery(groq`
        *[_type == 'theme']{
            title,
            'slug': slug.current,
            color,
            invert
        }
    `)

    const baseTheme = {
        name: 'Base',
        slug: 'base',
        base: '#22272f',
        palette: [
            '240 9% 98%',
            '216 14% 93%',
            '220 14% 88%',
            '214 15% 82%',
            '215 14% 74%',
            '215 14% 64%',
            '215 14% 53%',
            '216 16% 44%',
            '216 16% 36%',
            '215 17% 26%',
            '217 16% 16%',
        ],
    }

    // ACTIVE THEME =======================================================
    const activeTheme = useState('activeTheme', () => ({...baseTheme}))

    const setActiveTheme = (theme) => {
        activeTheme.value = themes.value.filter(t => t.slug == theme)[0]
        //console.log('new active theme', activeTheme.value)
    }

    // THEMES / STYLESHEET =======================================================
    const themes      = useState('themes', () => [{...baseTheme}])

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
        const tints = base.tints(8).map((tint) => `#${tint.hex}`)
        return tints[tints.length - 2]
    }

    const generateGradientPalette = (base, invert = null) => {
        const _base       = new Values(base)
        const _baseHex    = `#${_base.hex}`
        const _invertHex  = invert ?? generateInvert(_base)
        const _tint       = new Values(_invertHex).tints(12).map((tint) => `#${tint.hex}`)[3]
        const _shade      = _base.shades(10).map((shade) => `#${shade.hex}`)[2]
        const _gradient   = new Gradient()
                                .setColorGradient(_invertHex, _baseHex)
                                .setMidpoint(9)
                                .getColors()
        const palette    = [_tint, _invertHex, ..._gradient.slice(1, -1), _baseHex, _shade].map((color) => convertHSL(color))
        return { palette }
    }

    const cssVars = computed(() => themes.value.map(theme => {
        return {
            name: theme.slug,
            colors: theme.palette.map((color, index) => {
                return `--c-theme-${theme.slug}-${colorScale[index]}: hsl(${color});`
            }),
            colorsHSL: theme.palette.map((color, index) => {
                return `--c-theme-${theme.slug}-${colorScale[index]}-hsl: ${color};`
            }),
            themeColors: theme.palette.map((color, index) => {
                return `--c-theme-${colorScale[index]}: var(--c-theme-${theme.slug}-${colorScale[index]});`
            }),
            themeColorsHSL: theme.palette.map((color, index) => {
                return `--c-theme-${colorScale[index]}-hsl: var(--c-theme-${theme.slug}-${colorScale[index]}-hsl);`
            })

        }
    }))

    const buildStyleSheet = () => {
        const head = document.head
        const styleEl = document.createElement('style')

        styleEl.prepend(`
            :root {
                ${ cssVars.value.map(theme => theme.colors.join("\n")).join("\n")}
                ${ cssVars.value.map(theme => theme.colorsHSL.join("\n")).join("\n")}
            }
        `)

        const themeVariables = cssVars.value.map(theme => {
            return `
                [data-theme="${theme.name}"] {
                    ${theme.themeColors.join("\n")}
                    ${theme.themeColorsHSL.join("\n")}
                }
            `
        }).join("\n")

        styleEl.append(themeVariables)
        head.append(styleEl)
        console.warn('Theme Stylesheet Loaded')
        return
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