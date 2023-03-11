import { usePortalStore, usePageContextStore } from "~~/stores/portal"
import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to, from) => {
    const { closeMenu, menuOpen } = useMenu()
    const { lockScreen, resetScroll } = useScreenLock()

    const portal = usePortalStore()
    const { portalActive } = storeToRefs(portal)

    const context = usePageContextStore()
    const { pageContext } = storeToRefs(context)

    const { setActiveTheme, getEntryThemeIndex } = useThemes()

    const entry = getEntryThemeIndex(to)
    if (entry) {
        context.updateNextContext(entry)
    }

    to.meta.pageTransition = {
        name: 'cel-shading',
        mode: 'out-in',

        onBeforeLeave: (el) => {
            //lockScreen()
            portal.transitionReset()
            portalActive.value = true
        },

        onLeave: (el, done) => {
            setTimeout(() => {

                done()
            }, 1500)
        },

        onAfterLeave: (el) => {
            setActiveTheme(pageContext.value.next.theme)

            if ( menuOpen.value ) { closeMenu() }
        },

        onBeforeEnter: (el) => {},

        onEnter: (el, done) => {
            //resetScroll()
            done()
        },

        onAfterEnter: (el) => {},
    }

})