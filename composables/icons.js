import backendDevelopment from '@/assets/svgs/services/backend-development.svg'
import brandDesign from '@/assets/svgs/services/brand-design.svg'
import frontendDevelopment from '@/assets/svgs/services/frontend-development.svg'
import graphicDesign from '@/assets/svgs/services/graphic-design.svg'
import motionDesign from '@/assets/svgs/services/motion-design.svg'
import webDesign from '@/assets/svgs/services/web-design.svg'
import awardedIcon from '@/assets/svgs/services/awarded.svg'

import { objectify, omit } from 'radash'

const useIcons = () => {

    const awarded = awardedIcon

    const serviceIcons = [
        {
            label: 'Back-end Development',
            slug: 'backend',
            icon: backendDevelopment,
            panels: 7,
        },
        {
            label: 'Front-end Development',
            slug: 'frontend',
            icon: frontendDevelopment,
            panels: 7,
        },
        {
            label: 'Brand Design',
            slug: 'brand',
            icon: brandDesign,
            panels: 5,
        },
        {
            label: 'Graphic Design',
            slug: 'graphic',
            icon: graphicDesign,
            panels: 5,
        },
        {
            label: 'Motion Design',
            slug: 'motion',
            icon: motionDesign,
            panels: 5,
        },
        {
            label: 'Web Design',
            slug: 'web',
            icon: webDesign,
            panels: 5,
        },
    ]

    const serviceIconSet = objectify(serviceIcons, i => i.slug, i => i.icon)

    const serviceIconLabels = serviceIcons.map(i => omit(i, ['icon']))

    const serviceIconSlugs = serviceIcons.map(i => i.slug)

    return {
        awarded,
        serviceIcons,
        serviceIconSet,
        serviceIconLabels,
        serviceIconSlugs,
    }
}

export { useIcons }