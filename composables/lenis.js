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

    const lenis = useState('lenis', () => {})

    const initLenis = () => {
        lenis.value = new Lenis({
            lerp: 0.2,
            duration: 2.5,
            easing: easings.easeOutCubic,
            smoothWheel: true
        })

        // loop
        const raf = (time) => {
            lenis.value.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
        console.warn('Lenis Init')
    }

    return {
        initLenis,
        lenis,
    }
}

export { useLenis }