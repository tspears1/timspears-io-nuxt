import { defineStore } from 'pinia'

const useViewportStore = defineStore('viewport', () => {

    const { frameBorder } = useFrame()
    const headerHeight = useHeaderHeight()
    const { width: windowWidth, height: windowHeight } = useWindowSize()

    const scrollTopPadding = computed(() => frameBorder.value + headerHeight.value)

    const vh = {
        dvh: h => CSS.supports('height: 100dvh') ? `${h}dvh` : `${h}vh`,
        lvh: h => CSS.supports('height: 100lvh') ? `${h}lvh` : `${h}vh`,
        svh: h => CSS.supports('height: 100svh') ? `${h}svh` : `${h}vh`,
    }

    const content = reactive({
        x: windowWidth.value - frameBorder.value * 2,
        y: windowHeight.value - frameBorder.value * 2 - headerHeight.value,
    })

    const breakpoints = useBreakpoints({
        xxs: 0,
        xs: 375,
        sm: 600,
        md: 768,
        lg: 992,
        xl: 1200,
        comp: 1440,
        xxl: 1600,
        xxxl: 1840,
    })

    return {
        breakpoints,
        content,
        scrollTopPadding,
        windowWidth,
        windowHeight,
        vh,
    }

})

export { useViewportStore }