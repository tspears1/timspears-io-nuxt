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
import { animate } from 'motion'
import { draw, setDashoffset, setAspectRatio } from '@/utils/svgs'

const { menuOpen } = useMenu()
const { transitionTime } = useMenuGrid()

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

const runEnter = () => {
    setTimeout(() => {
        paths.forEach((path, index) => {
            animate(path.el, draw(path.offset, false), { duration: 1.5, delay: 0.15 * index, easing: cubicBezier.easeOutCubic })
        })
    }, transitionTime.value * 0.45)
}

const runExit = () => {
    paths.forEach((path) => {
        animate(path.el, { strokeDashoffset: [null, path.offset], opacity: [1, 0] }, { duration: 1.5 })
    })
}

watch(menuOpen, (value) =>{
    value == true ? runEnter() : runExit()
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
