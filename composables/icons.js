import backendDevelopment from '@/assets/svgs/services/backend-development.svg'
import brandDesign from '@/assets/svgs/services/brand-design.svg'
import frontendDevelopment from '@/assets/svgs/services/frontend-development.svg'
import graphicDesign from '@/assets/svgs/services/graphic-design.svg'
import motionDesign from '@/assets/svgs/services/motion-design.svg'
import webDesign from '@/assets/svgs/services/web-design.svg'
import awardedIcon from '@/assets/svgs/services/awarded.svg'

import icon_animeJs from '@/assets/svgs/tools/anime-js.svg'
import icon_atipo from '@/assets/svgs/tools/atipo.svg'
import icon_craft from '@/assets/svgs/tools/craft.svg'
import icon_formKit from '@/assets/svgs/tools/form-kit.svg'
import icon_framerMotion from '@/assets/svgs/tools/framer-motion.svg'
import icon_gatsby from '@/assets/svgs/tools/gatsby.svg'
import icon_graphQl from '@/assets/svgs/tools/graph-ql.svg'
import icon_javascript from '@/assets/svgs/tools/javascript.svg'
import icon_lenis from '@/assets/svgs/tools/lenis.svg'
import icon_motionOne from '@/assets/svgs/tools/motion-one.svg'
import icon_nuxt from '@/assets/svgs/tools/nuxt.svg'
import icon_pinia from '@/assets/svgs/tools/pinia.svg'
import icon_react from '@/assets/svgs/tools/react.svg'
import icon_recoil from '@/assets/svgs/tools/recoil.svg'
import icon_sanity from '@/assets/svgs/tools/sanity.svg'
import icon_sass from '@/assets/svgs/tools/sass.svg'
import icon_splide from '@/assets/svgs/tools/splide.svg'
import icon_strapi from '@/assets/svgs/tools/strapi.svg'
import icon_vite from '@/assets/svgs/tools/vite.svg'
import icon_vueUse from '@/assets/svgs/tools/vue-use.svg'
import icon_vue from '@/assets/svgs/tools/vue.svg'
import icon_wordpress from '@/assets/svgs/tools/wordpress.svg'

import { objectify, omit } from 'radash'

const useIcons = () => {

    const awarded = awardedIcon

    const serviceIcons = [
        {
            label: 'Front-end Development',
            slug: 'frontend',
            icon: frontendDevelopment,
            panels: 7,
        },
        {
            label: 'Web Design',
            slug: 'web',
            icon: webDesign,
            panels: 5,
        },
        {
            label: 'Motion Design',
            slug: 'motion',
            icon: motionDesign,
            panels: 5,
        },
        {
            label: 'Graphic Design',
            slug: 'graphic',
            icon: graphicDesign,
            panels: 5,
        },
        {
            label: 'Back-end Development',
            slug: 'backend',
            icon: backendDevelopment,
            panels: 7,
        },
        {
            label: 'Brand Design',
            slug: 'brand',
            icon: brandDesign,
            panels: 5,
        },
    ]

    const serviceIconSet = objectify(serviceIcons, i => i.slug, i => i.icon)

    const serviceIconLabels = serviceIcons.map(i => omit(i, ['icon']))

    const serviceIconSlugs = serviceIcons.map(i => i.slug)

    const toolIcons = [
        {
            label: 'Anime.js',
            slug: 'anime-js',
            icon: icon_animeJs,
        },
        {
            label: 'Atipo Foundry',
            slug: 'atipo',
            icon: icon_atipo,
        },
        {
            label: 'Craft CMS',
            slug: 'craft',
            icon: icon_craft,
        },
        {
            label: 'Form Kit',
            slug: 'form-kit',
            icon: icon_formKit,
        },
        {
            label: 'Framer Motion',
            slug: 'framer-motion',
            icon: icon_framerMotion,
        },
        {
            label: 'Gatsby',
            slug: 'gatsby',
            icon: icon_gatsby,
        },
        {
            label: 'GraphQL',
            slug: 'graph-ql',
            icon: icon_graphQl,
        },
        {
            label: 'JavaScript',
            slug: 'javascript',
            icon: icon_javascript,
        },
        {
            label: 'Lenis',
            slug: 'lenis',
            icon: icon_lenis,
        },
        {
            label: 'Motion One',
            slug: 'motion-one',
            icon: icon_motionOne,
        },
        {
            label: 'Nuxt 3',
            slug: 'nuxt',
            icon: icon_nuxt,
        },
        {
            label: 'Pinia',
            slug: 'pinia',
            icon: icon_pinia,
        },
        {
            label: 'React',
            slug: 'react',
            icon: icon_react,
        },
        {
            label: 'Recoil',
            slug: 'recoil',
            icon: icon_recoil,
        },
        {
            label: 'Sanity',
            slug: 'sanity',
            icon: icon_sanity,
        },
        {
            label: 'Sass',
            slug: 'sass',
            icon: icon_sass,
        },
        {
            label: 'Splide',
            slug: 'splide',
            icon: icon_splide,
        },
        {
            label: 'Strapi',
            slug: 'strapi',
            icon: icon_strapi,
        },
        {
            label: 'Vite',
            slug: 'vite',
            icon: icon_vite,
        },
        {
            label: 'VueUse',
            slug: 'vue-use',
            icon: icon_vueUse,
        },
        {
            label: 'Vue 3',
            slug: 'vue',
            icon: icon_vue,
        },
        {
            label: 'WordPress',
            slug: 'wordpress',
            icon: icon_wordpress,
        },
    ]

    const toolIconSet = objectify(toolIcons, i => i.slug, i => i.icon)

    return {
        awarded,
        serviceIcons,
        serviceIconSet,
        serviceIconLabels,
        serviceIconSlugs,
        toolIcons,
        toolIconSet,
    }
}

export { useIcons }