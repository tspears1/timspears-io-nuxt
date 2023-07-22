
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
    }
}

const useFrame = () => {
    const { root } = useRoot()
    const frameBorder = useState('frameBorder', () => 0)

    const _getFrameBorder = () => {
        const size = useCssVar('--frame-border', root)
        return remToPx(size.value)
    }

    frameBorder.value = _getFrameBorder()

    const getFrameBorder = (sides = 1) => frameBorder.value * sides

    return {
        frameBorder,
        getFrameBorder,
    }
}

const useHeaderHeight = () => useState('headerHeight', () => 0)

const useFilterBarHeight = () => useState('filterBarHeight', () => 0)

const useScreenLock = () => {
    const { lenis } = useLenis()

    const isLocked = useState('isLocked', () => false)

    const lockScreen = () => {
        lenis.value.stop()
        isLocked.value = true
    }

    const unlockScreen = () => {
        lenis.value.start()
        isLocked.value = false
    }

    const resetScroll = () => {
        window.scrollTo(0, 0)
    }

    watch(isLocked, (value) => {
        document.documentElement.dataset.isLocked = value
    })

    return {
        isLocked,
        lockScreen,
        unlockScreen,
        resetScroll,
    }
}

export {
    useFrame,
    useRoot,
    useFilterBarHeight,
    useHeaderHeight,
    useScreenLock,
    useViewport
}