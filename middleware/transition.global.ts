export default defineNuxtRouteMiddleware((to, from) => {
    const { updateContext, onBeforeEnterCallback, onEnterCallback } = useTransition()
    const { setActiveTheme, getEntryThemeIndex } = useThemes()

    console.log('updating context', {to, from})
    //updateContext('next', to.name, to.meta.theme)
    to.meta.pageTransition = {
        name: 'grid-swap',
        mode: 'out-in',
        onBeforeEnter: (el) => console.log('BEFORE ENTER', Date.now() / 1000),
        onEnter: (el, done) => setTimeout(() => {
            console.log('ENTERED', Date.now() / 1000)
            done()
        }, 5000),
        onAfterEnter: (el) => console.log('AFTER ENTER', Date.now() / 1000),
        onBeforeLeave: (el) => console.log('BEFORE LEAVE', Date.now() / 1000),
        onLeave: (el, done) => setTimeout(() => {
            console.log('LEAVEED', Date.now() / 1000)
            done()
        }, 5000),
        onAfterLeave: (el) => {
            const next = getEntryThemeIndex(to)
            if ( next ) {
                console.log({next})
                setActiveTheme(next.theme)
            }
            console.log('AFTER LEAVE', Date.now() / 1000)
        },
    }

})