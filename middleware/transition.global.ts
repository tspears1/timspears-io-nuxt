export default defineNuxtRouteMiddleware((to, from) => {
    const { updateContext, onBeforeEnterCallback, onEnterCallback } = useTransition()

    console.log('updating context')
    updateContext('next', to.name, to.meta.theme)
    to.meta.pageTransition = {
        name: 'grid-swap',
        mode: 'out-in',
        onBeforeEnter: onBeforeEnterCallback,
        onEnter: onEnterCallback,
    }

})