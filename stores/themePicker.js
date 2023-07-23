import { defineStore } from 'pinia'
import { usePageContextStore } from '~~/stores/portal'

const useThemePickerStore = defineStore('themePicker', () => {
    const { lockScreen, unlockScreen } = useScreenLock()
    const { setActiveTheme } = useThemes()
    const { updateContext } = usePageContextStore()

    const updateTheme = (slug) => {
        updateContext('current', {
            theme: slug
        })
        setActiveTheme(slug)
    }

    // THEME PICKER MENU =============================================
    const themePickerOpen = ref(false)

    const scrollToActive = () => {
        const active = document.querySelector('.theme-picker__theme--active')
        if (active) {
            active.scrollIntoView({
                block: 'center',
                inline: 'center',
            })
        }
    }

    const openThemePicker = () => {
        lockScreen()
        themePickerOpen.value = true
        waitForEl('.theme-picker__theme--active').then(() => {
            scrollToActive()
        })
    }
    const closeThemePicker = () => {
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
        themePickerOpen,
        toggleThemePicker,
        updateTheme,
    }
})

export { useThemePickerStore }