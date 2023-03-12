import arrowRight from '@/assets/svgs/button/arrow-right.svg'
import caretDown from '@/assets/svgs/button/caret-down.svg'
import grommet from '@/assets/svgs/button/grommet.svg'

const useButton = () => {

    const icons = { arrowRight, caretDown, grommet }

    return {
        icons
    }
}

export { useButton }