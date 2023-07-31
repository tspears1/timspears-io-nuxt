<script setup>
import { timeline, stagger, spring } from 'motion'
import { draw, setDashoffset } from '@/utils/svgs'
import { usePortalStore, usePageContextStore } from '~/stores/portal'
import { storeToRefs } from 'pinia'

const { lockScreen } = useScreenLock()
const { setActiveTheme } = useThemes()

const portal = usePortalStore()
const { portalActive } = storeToRefs(portal)

const context = usePageContextStore()
const { pageContext } = storeToRefs(context)

const triangle = ref()
const square   = ref()
const circle   = ref()
const hexagon  = ref()

const circleOffset = computed(() => circle.value ? setDashoffset(circle.value) : null)

const onEnter = () => {
    const sequence = [
        [circle.value, draw(circleOffset.value, false), { duration: 4.25, at: 0.5 } ],
        [
            [triangle.value, square.value, hexagon.value],
            { y: [60, 0], opacity: [ 0, 1 ] },
            { delay: stagger(0.5), easing: spring({ damping: 5 }), duration: 0.75, at: 1.25 } ],
    ]

    timeline(sequence).finished.then(() => {
        portalActive.value = true
        document.documentElement.dataset.loaded = true
        setTimeout(() => {
            setActiveTheme(pageContext.value.next?.theme || 'base')
        }, 1500);
    })
}

onMounted(() => {
    onEnter()
})

</script>

<template>
    <div class="loading-screen">
        <svg class="loading-screen__logo" width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                class="loading-screen__shape"
                d="M137.861 74.5864L146.621 89.7595L137.861 104.933L120.34 104.933L111.58 89.7595L120.34 74.5864L137.861 74.5864Z"
                fill="var(--logo-fill, currentColor)"
                ref="hexagon"
            />
            <rect
                class="loading-screen__shape"
                x="74.6406"
                y="74.6201"
                width="30.1333"
                height="30.1333"
                fill="var(--logo-fill, currentColor)"
                ref="square"
            />
            <path
                class="loading-screen__shape"
                d="M50.7425 74.6201L67.84 104.234H33.645L50.7425 74.6201Z"
                fill="var(--logo-fill, currentColor)"
                ref="triangle"
            />
            <circle
                cx="90"
                cy="90"
                r="89"
                stroke="var(--logo-fill, currentColor)"
                stroke-width="2"
                ref="circle"
            />
        </svg>
    </div>
</template>


