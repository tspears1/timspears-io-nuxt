import backendDevelopment from '@/assets/svgs/services/backend-development.svg'
import brandDesign from '@/assets/svgs/services/brand-design.svg'
import frontendDevelopment from '@/assets/svgs/services/frontend-development.svg'
import graphicDesign from '@/assets/svgs/services/graphic-design.svg'
import motionDesign from '@/assets/svgs/services/motion-design.svg'
import webDesign from '@/assets/svgs/services/web-design.svg'

import { objectify, omit } from 'radash'

const useIcons = () => {

    const serviceIcons = [
        {
            label: 'Back-end Development',
            slug: 'backend',
            icon: backendDevelopment,
        },
        {
            label: 'Front-end Development',
            slug: 'frontend',
            icon: frontendDevelopment,
        },
        {
            label: 'Brand Design',
            slug: 'brand',
            icon: brandDesign,
        },
        {
            label: 'Graphic Design',
            slug: 'graphic',
            icon: graphicDesign,
        },
        {
            label: 'Motion Design',
            slug: 'motion',
            icon: motionDesign,
        },
        {
            label: 'Web Design',
            slug: 'web',
            icon: webDesign,
        },
    ]

    const serviceIconSet = objectify(serviceIcons, i => i.slug, i => i.icon)

    const serviceIconLabels = serviceIcons.map(i => omit(i, ['icon']))

    const serviceIconSlugs = serviceIcons.map(i => i.slug)

    return {
        serviceIcons,
        serviceIconSet,
        serviceIconLabels,
        serviceIconSlugs,
    }
}

export { useIcons }