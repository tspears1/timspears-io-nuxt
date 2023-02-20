import Lenis from '@studio-freight/lenis'
import { easings } from '../utils/easings'

// https://github.com/studio-freight/lenis
// const lenis = new Lenis({
//   duration: 1.2,
//   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
//   direction: 'vertical', // vertical, horizontal
//   gestureDirection: 'vertical', // vertical, horizontal, both
//   smooth: true,
//   mouseMultiplier: 1,
//   smoothTouch: false,
//   touchMultiplier: 2,
//   infinite: false,
// })

const useLenis = () => {
    // init
    const lenis = new Lenis({
        lerp: 0.2,
        //duration: 2.5,
        //easing: easings.easeOutCirc,
        smooth: true
    })

    // loop
    const raf = (time) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)


    // callbacks
    const onScroll = (callback) => lenis.on('scroll', callback)

    const { scrollTo, stop, start } = lenis

    return {
        lenis,
        onScroll,
        scrollTo,
        stop,
        start,
    }
}

export { useLenis }