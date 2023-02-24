<script setup>
import aboutFill from '@/assets/svgs/menu/about-fill.svg'
import aboutOutline from '@/assets/svgs/menu/about-outline.svg'
import contactFill from '@/assets/svgs/menu/contact-fill.svg'
import contactOutline from '@/assets/svgs/menu/contact-outline.svg'
import thoughtsFill from '@/assets/svgs/menu/thoughts-fill.svg'
import thoughtsOutline from '@/assets/svgs/menu/thoughts-outline.svg'
import workFill from '@/assets/svgs/menu/work-fill.svg'
import workOutline from '@/assets/svgs/menu/work-outline.svg'

import { title } from 'radash'
import { animate, inView } from 'motion'
import { draw, setDashoffset } from '@/utils/svgs'

const { menuOpen } = useMenu()

const collection = {
    about: {
        fill: aboutFill,
        outline: aboutOutline
    },
    contact: {
        fill: contactFill,
        outline: contactOutline
    },
    thoughts: {
        fill: thoughtsFill,
        outline: thoughtsOutline
    },
    work: {
        fill: workFill,
        outline: workOutline
    },
}

const titleRef = ref({})
const outlineRef = ref({})
const fillRef = ref({})

let paths = []

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
})

const setAspectRatio = (svg) => {
    // Convert to array: [x1, y1, x2, y2]
    const viewbox = svg.getAttribute('viewBox').split(/\s+|,/) ?? null
    // Add aspect ratio as an inline style: x2 - x1 / y2 - y1
    if (viewbox) {
        svg.style.aspectRatio = `${viewbox[2] - viewbox[0]} / ${viewbox[3] - viewbox[1]}`
    }
}

onMounted(() => {
    setAspectRatio(outlineRef.value.$el)
    setAspectRatio(fillRef.value.$el)

    Array.from(outlineRef.value.$el.children).forEach((child) => {
        paths = [...paths, {
            el: child,
            offset: setDashoffset(child),
        }]
        child.style.opacity = 0
    })
})

watch(menuOpen, (value) =>{
    if (value == true) {
        paths.forEach((path) => {
                animate(path.el, draw(path.offset, false), { duration: 1.5 })
        })
    } else {
        paths.forEach((path) => {
            animate(path.el, { strokeDashoffset: [null, path.offset], opacity: [1, 0] }, { duration: 1.5 })
        })
    }
})

</script>

<template>
    <div class="site-menu__title" ref="titleRef">
        <span class="sr-only">{{ title(props.title) }}</span>
        <span class="site-menu__outline-wrapper">
            <component ref="outlineRef" :is="collection[props.title].outline" class="site-menu__outline-svg" />
        </span>
        <span class="site-menu__fill-wrapper">
            <component ref="fillRef" :is="collection[props.title].fill" class="site-menu__fill-svg" />
        </span>
    </div>
</template>