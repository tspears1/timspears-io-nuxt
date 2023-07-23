import { defineStore } from 'pinia'
import { usePageContextStore } from '~~/stores/portal'

const useThemePickerStore = defineStore('themePicker', () => {
    const { lockScreen, unlockScreen } = useScreenLock()
    const { themes, activeTheme, setActiveTheme } = useThemes()
    const { updateContext } = usePageContextStore()

    const updateTheme = (slug) => {
        updateContext('current', {
            theme: slug
        })
        setActiveTheme(slug)
    }

    // Reorder themes so that the active theme is first and the rest are alphabetical based on their slug
    const reorderedThemes = computedEager(() => {
        const rest = themes.value.filter(theme => theme.slug != activeTheme.value).sort((a, b) => a.slug.localeCompare(b.slug))
        return [activeTheme.value, ...rest]
    })

    // THEME PICKER MENU =============================================
    const themePickerOpen = ref(false)

    const openThemePicker = () => {
        console.log('openThemePicker')
        lockScreen()
        themePickerOpen.value = true
    }
    const closeThemePicker = () => {
        console.log('closeThemePicker')
        unlockScreen()
        themePickerOpen.value = false
    }

    const toggleThemePicker = () => themePickerOpen.value ? closeThemePicker() : openThemePicker()

    watch(themePickerOpen, (value) => {
        document.documentElement.dataset.modalOpen = value
    })



    return {
        closeThemePicker,
        openThemePicker,
        reorderedThemes,
        themePickerOpen,
        toggleThemePicker,
        updateTheme,
    }
})

export { useThemePickerStore }