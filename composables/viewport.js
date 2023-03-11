const useRoot = () => {
    let root
    let body

    onMounted(() => {
        root = document.documentElement
        body = document.querySelector('body')
    })

    return { root, body }
}

const useViewport = () => {
    const isLandscape = () => window.innerWidth >= window.innerHeight

    return {
        isLandscape,
        is
    }
}

const useFrame = () => {
    const { root } = useRoot()
    const frameBorder = useState('frameBorder', () => 0)

    const _getFrameBorder = () => {
        const size = useCssVar('--frame-border', root)
        return parseFloat(size.value) * 16
    }

    frameBorder.value = _getFrameBorder()

    const getFrameBorder = (sides = 1) => frameBorder.value * sides

    return {
        frameBorder,
        getFrameBorder,
    }
}

const useHeaderHeight = () => useState('headerHeight', () => 0)

const useScreenLock = () => {
    const { lenis } = useLenis()

    const isLocked = useState('isLocked', () => false)

    const lockScreen = () => isLocked.value = true

    const unlockScreen = () => isLocked.value = false

    const toggleScreenLock = () => isLocked.value = !isLocked.value

    const resetScroll = () => {
        window.scrollTo(0, 0)
        console.log('SCROLL RESET?')
    }

    watch(isLocked, (value) => {
        document.documentElement.dataset.isLocked = value
        value == true ? lenis.value.stop() : lenis.value.start()
    })


    return {
        isLocked,
        lockScreen,
        unlockScreen,
        resetScroll,
        toggleScreenLock,
    }
}

export { useFrame, useRoot, useHeaderHeight, useScreenLock, useViewport }