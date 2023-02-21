import { useGlobalData } from "~~/data/global"

const useMenu = () => {

    const menuOpen = useState('menuOpen', () => false)

    const openMenu = () => menuOpen.value = true

    const closeMenu = () => menuOpen.value = false

    const toggleMenu = () => menuOpen.value = !menuOpen.value

    watch(menuOpen, (value) => {
        document.documentElement.dataset.menuOpen = value
    })


    return {
        menuOpen,
        openMenu,
        closeMenu,
        toggleMenu,
    }
}

const useMenuGrid = () => {
    const { data } = useGlobalData()

    const { width: windowWidth, height: windowHeight } = useWindowSize()
    const { getFrameBorder } = useFrame()
    const headerHeight = useHeaderHeight()

    const menuWidth   = computed(() => windowWidth.value - getFrameBorder(2))
    const menuHeight  = computed(() => windowHeight.value - headerHeight.value - getFrameBorder(2))
    const rowCount    = computed(() => data.value.navigation.length * 2)
    const tileSize    = computed(() => menuHeight.value / rowCount.value)
    const columnCount = computed(() => Math.ceil( menuWidth.value / tileSize.value ))
    const tileCount   = computed(() => columnCount.value * rowCount.value)
    const tileArray   = computed(() => Array.from({ length: tileCount.value }))

    return {
        menuWidth,
        menuHeight,
        rowCount,
        tileSize,
        columnCount,
        tileCount,
        tileArray,
    }
}

export { useMenu, useMenuGrid }