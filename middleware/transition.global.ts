export default defineNuxtRouteMiddleware((to, from) => {
    const { updateContext, onBeforeEnterCallback, onEnterCallback } = useTransition()
    const { setActiveTheme } = useThemes()

    if ( to.name == from.path ) {
        setActiveTheme(to.meta.theme)
    }

    console.log('updating context', {to, from})
    updateContext('next', to.name, to.meta.theme)
    to.meta.pageTransition = {
        name: 'grid-swap',
        mode: 'out-in',
        onBeforeEnter: onBeforeEnterCallback,
        onEnter: onEnterCallback,
    }

})