import { useGlobalData } from "~~/data/global"
import { cluster, list } from 'radash'

const useMenu = () => {

    const { isLocked } = useScreenLock()

    const menuOpen = useState('menuOpen', () => false)

    const openMenu = () => menuOpen.value = true

    const closeMenu = () => menuOpen.value = false

    const toggleMenu = () => menuOpen.value = !menuOpen.value

    watch(menuOpen, (value) => {
        document.documentElement.dataset.menuOpen = value
        isLocked.value = value
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

    const menuWidth      = computed(() => windowWidth.value - getFrameBorder(2))
    const menuHeight     = computed(() => windowHeight.value - headerHeight.value - getFrameBorder(2))
    const rowCount       = computed(() => data.value.navigation.length * 2)
    const tileSize       = computed(() => menuHeight.value / rowCount.value)
    const columnCount    = computed(() => Math.ceil( menuWidth.value / tileSize.value ))
    const tileCount      = computed(() => columnCount.value * rowCount.value)
    const tileArray      = computed(() => Array.from({ length: tileCount.value }))
    const rowList        = computed(() => cluster(list(1, tileCount.value, (i) => i), columnCount.value * 2))
    const transitionTime = computed(() => tileCount.value * tileDelay.value) // update that to match breakpoints

    const tileDelay = computed(() => {
        const bp = windowWidth.value
        return bp > 1840 ? 8
            : bp > 1200 ? 16
            : bp > 992 ? 24
            : bp > 600 ? 32
            : 40
    })

    const getListRow = (count) => {
        let row = 0
        rowList.value.forEach((group, index) => {
            if (!!group.find(i => i === count)) {
                return row = index
            }
        })
        return row
    }

    return {
        menuWidth,
        menuHeight,
        rowCount,
        tileSize,
        columnCount,
        tileCount,
        tileArray,
        rowList,
        getListRow,
        transitionTime
    }
}

// const useGridTransition = (callback) => {
//     const { menuOpen } = useMenu()
//     const { tileCount } = useMenuGrid()

//     let progress = 0
//     const timer = ref()
//     const gridEntered = ref(false)
//     const transitionTime = computed(() => tileCount.value * 10)

//     watch(menuOpen, (value) => {
//         if (value == true) {
//             timer.value = setTimeout(() => {
//                 gridEntered.value = true
//                 if (callback) { callback() }
//             }, transitionTime.value)
//         } else {
//             gridEntered.value = false
//             clearTimeout( timer.value )
//         }
//     }, { immediate: true })

//     return {
//         transitionTime,
//         gridEntered
//     }
// }

export { useMenu, useMenuGrid }