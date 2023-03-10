import { usePortalStore, usePageContextStore } from "~~/stores/portal"
import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to, from) => {
    const { closeMenu, menuOpen } = useMenu()
    const { lockScreen, unlockScreen, resetScroll } = useScreenLock()

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
            lockScreen()
            portal.transitionReset()
            portalActive.value = true
            console.log('BEFORE LEAVE', Date.now() / 1000)
        },

        onLeave: (el, done) => {
            setTimeout(() => {
                console.log('LEAVED', Date.now() / 1000)
                done()
            }, 1500)
        },

        onAfterLeave: (el) => {

            setActiveTheme(pageContext.value.next.theme)

            if ( menuOpen.value ) { closeMenu() }


            console.log('AFTER LEAVE', Date.now() / 1000)
        },

        onBeforeEnter: (el) => {
            console.log('BEFORE ENTER', Date.now() / 1000)
        },

        onEnter: (el, done) => {
            console.log('ENTERED', Date.now() / 1000)
            resetScroll()
            done()
        },

        onAfterEnter: (el) => {
            unlockScreen() // should these move to a watch for transition completed?

            portalActive.value = false
            console.log('AFTER ENTER', Date.now() / 1000)
        },

    }

})