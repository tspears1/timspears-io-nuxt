<script setup>
import { list } from 'radash'
import { timeline, stagger } from 'motion'

import { usePortalStore, usePageContextStore } from '~/stores/portal'
import { storeToRefs } from 'pinia'

const { unlockScreen } = useScreenLock()
const { isLandscape } = useViewport()

const portal = usePortalStore()
const { portalActive, loadingScreenActive } = storeToRefs(portal)

const context = usePageContextStore()
const { pageContext } = storeToRefs(context)

const loadingScreen = ref()
const portalBook    = ref()

const currentRef    = ref()
const nextRef       = ref()
const currentTheme  = computed(() => pageContext.value.current.theme ?? 'base' )
const nextTheme     = computed(() => pageContext.value.next.theme ?? 'base')
const currentPanels = computed(() => list(1, 12, i => pad(i, '00')) )
const nextPanels    = computed(() => list(1, 12, i => pad(i, '00')).reverse() )


const portalOpen = () => {
    const panelEnterMotion = isLandscape() ? { x: ['100%', 0] } : { y: ['100%', 0] }
    const panelExitMotion = isLandscape() ? { x: [null, '-100%' ] } : { y: [null, '-100%' ] }

    const sequence = [
        [[...currentRef.value, ...nextRef.value], panelEnterMotion, { delay: stagger(0.08), easing: cubicBezier.easeInOutCubic, duration: 0.5 }],
        [loadingScreen.value, { opacity: 0 }, { duration: 0.01 }],
        [[...currentRef.value, ...nextRef.value], panelExitMotion, { duration: 1, easing: cubicBezier.easeOutExpo, at: "<" }],
    ]
    timeline(sequence).finished.then(() => {
        portal.transitionDone()
        portalActive.value = false
        // unlockScreen()

        if ( !!loadingScreenActive.value ) {
            loadingScreenActive.value = false
        }
    })
}

watch(portalActive, (value) => {
    if (!!value ) {
        portalOpen()
    }
}, { immediate: true })

</script>

<template>
    <div
        class="site-portal"
        ref="portalBook"
    >
        <div class="site-portal_loading-screen" ref="loadingScreen">
            <SiteLoadingScreen v-if="loadingScreenActive" />
        </div>
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
