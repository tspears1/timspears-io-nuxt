import imagesLoaded from 'imagesloaded'
import { is } from './type'

// Preload images
const preloadImages = (selector) => {
    return new Promise((resolve, reject) => {
        const source = is.arr(selector)
            ? selector
            : is.str(selector)
                ? document.querySelectorAll(selector)
                : null
        if (!source) return
        imagesLoaded(source, { background: true }, resolve)
    })
}

export { preloadImages }
