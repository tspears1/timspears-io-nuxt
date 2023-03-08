
const useCallbacks = () =>  useState('transitionCallback', () => ({
    onBeforeEnter: undefined,
    onEnter: null,
}))

const usePortal = () => {
    const { isLocked } = useScreenLock()

    const portalOpen = useState('portalOpen', () => false)

    const openPortal = () => portalOpen.value = true

    const closePortal = () => portalOpen.value = false

    const togglePortal = () => portalOpen.value = !portalOpen.value

    watch(portalOpen, (value) => {
        document.documentElement.dataset.portalOpen = value
        isLocked.value = value
    })

    return {
        portalOpen,
        openPortal,
        closePortal,
        togglePortal,
    }
}

const useTransition = () => {

    const pageContext = useState('pageContext', () => ({
        next: {
            name: '',
            theme: '',
        },
        current: {
            name: '',
            theme: '',
        },
        prev: {
            name: '',
            theme: '',
        }
    }))

    const updateContext = (key, entry) => {
        pageContext.value[key] = entry

        //update current and prev before updating ?
    }

    const onBeforeEnterCallback = (el) => {
        console.log('beforEnter', {el})
    }

    const onEnterCallback = (el, done) => {
        let ready = false
        if ( ready ) {
            done
        }
        setTimeout(() => {
            ready = true
        }, 3000)
    }

    //TODO:
    //  lock screen if not already locked
    //  get page context for next page
    //  transition grid enter
    //  If menu open, reset menu (no animation)
    //  update theme
    //  swap pages
    //  transition grid exit
    //  trigger hero animations
    //  update page context (next="null", current="next", prev="current")

    // const transitionOptions = useState('transitionOptions', () => ({
    //     name: 'grid-swap',
    //     mode: 'out-in',
    //     onBeforeEnter: undefined,
    // }))

    // const onBeforeEnterCallback = (callback) => callback

    // const updateEvents = (events = {}) => transitionOptions.value = {
    //     ...transitionOptions.value,
    //     ...events,
    // }

    return {
        onBeforeEnterCallback,
        onEnterCallback,
        pageContext,
        updateContext,

    }
}

export { useTransition, useCallbacks, usePortal }
