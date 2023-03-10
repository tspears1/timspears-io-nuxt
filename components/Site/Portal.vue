<script setup>
import { list } from 'radash'
import { timeline, stagger } from 'motion'

import { usePortalStore, usePageContextStore } from '~/stores/portal'
import { storeToRefs } from 'pinia'

const portal = usePortalStore()
const { portalActive, transitionCompleted } = storeToRefs(portal)

const context = usePageContextStore()
const { pageContext } = storeToRefs(context)

const currentRef    = ref()
const nextRef       = ref()
const currentTheme  = computed(() => pageContext.value.current.theme ?? 'base' )
const nextTheme     = computed(() => pageContext.value.next.theme ?? 'base')
const currentPanels = computed(() => list(1, 12, i => pad(i, '00')) )
const nextPanels    = computed(() => list(1, 12, i => pad(i, '00')).reverse() )


const portalOpen = () => {
    console.log('PORTAL OPEN MOTION STARTED', pageContext.value.current.theme, pageContext.value.next.theme)
    const sequence = [
        [currentRef.value, { x: ['100%', 0] }, { delay: stagger(0.08, { easing: cubicBezier.easeOutQuint }) }],
        [nextRef.value, { x: ['100%', 0] }, { delay: stagger(0.08, { easing: cubicBezier.easeInQuint }) }],
        [[...currentRef.value, ...nextRef.value], { x: [0, '-100%' ] }, { duration: 2, easing: cubicBezier.easeOutQuint }] // move whole panel group?
    ]
    timeline(sequence)
}

watch(portalActive, (value) => {
    if (!!value ) {
        portalOpen()
    }
}, { immediate: true })

// .finished.then(() => {
//         console.log('FINISHED')
//         transitionCompleted.value = true
//     })

</script>

<template>
    <div
        class="site-portal"
        ref="portalBook"
    >
        <div class="site-portal_loading-screen"></div>
        <div class="site-portal__panels">
            <div
                class="site-portal__panel site-portal__panel--current"
                ref="currentRef"
                ref_for="true"
                v-for="(digit, index) in currentPanels"
                :key="`${digit}-${index}-current`"
                :style="`background: var(--c-theme-${currentTheme}-${digit});`"
            />
            <div
                class="site-portal__panel site-portal__panel--next"
                ref="nextRef"
                ref_for="true"
                v-for="(digit, index) in nextPanels"
                :key="`${digit}-${index}-next`"
                :style="`background: var(--c-theme-${nextTheme}-${digit});`"
            />
        </div>
    </div>
</template>
