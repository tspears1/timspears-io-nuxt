
const useCallbacks = () =>  useState('transitionCallback', () => ({
    onBeforeEnter: undefined,
    onEnter: null,
}))
const useTransition = () => {




    // console.log(useTransitionCallback)

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

    const updateContext = (key, name, theme) => pageContext.value[key] = { name, theme }

    // const transitionCallbacks =

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

export { useTransition, useCallbacks }
