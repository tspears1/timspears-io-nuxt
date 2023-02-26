const useRoot = () => {
    let root
    let body

    onMounted(() => {
        root = document.documentElement
        body = document.querySelector('body')
    })

    return { root, body }
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
    const isLocked = useState('isLocked', () => false)

    const lockScreen = () => isLocked.value = true

    const unlockScreen = () => isLocked.value = false

    const toggleScreenLock = () => isLocked.value = !isLocked.value

    watch(isLocked, (value) => {
        document.documentElement.dataset.isLocked = value
    })


    return {
        isLocked,
        lockScreen,
        unlockScreen,
        toggleScreenLock,
    }
}

export { useFrame, useRoot, useHeaderHeight, useScreenLock }