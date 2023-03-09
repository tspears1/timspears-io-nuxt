<script setup>
import { list } from 'radash'
import { animate, stagger } from 'motion'

import { usePortalStore, usePageContextStore } from '~/stores/portal'
import { storeToRefs } from 'pinia'

const portal = usePortalStore()
const { portalActive, transitionCompleted } = storeToRefs(portal)

const context = usePageContextStore()
const { pageContext } = storeToRefs(context)

const panelsRef     = ref()
const currentTheme  = computed(() => pageContext.value.current.theme ?? 'base' )
const nextTheme     = computed(() => pageContext.value.next.theme ?? 'base')
const currentPanels = computed(() => list(1, 12, i => `--c-theme-${currentTheme.value}-${pad(i, '00')}`) )
const nextPanels    = computed(() => list(1, 12, i => `--c-theme-${nextTheme.value}-${pad(i, '00')}`).reverse() )
const panels        = computed(() => [...currentPanels.value, ...nextPanels.value] )

const portalOpen = () => {
    console.log('PORTAL OPEN MOTION STARTED')
    animate(
        panelsRef.value,
        { x: ['100%', 0] },
        { delay: stagger(0.08, { easing: cubicBezier.easeInCirc }), easing: cubicBezier.easeOutCirc }
    ).finished.then(() => {
        portalClose()
    })
}

const portalClose = () => {
    animate(
        panelsRef.value,
        { x: [0, '-100%' ] },
        { duration: 2, easing: cubicBezier.easeOutCirc }
    ).finished.then(() => {
        transitionCompleted.value = true
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
        <div class="site-portal_loading-screen"></div>
        <div class="site-portal__panels">
            <div
                class="site-portal__panel"
                ref="panelsRef"
                ref_for="true"
                v-for="(screen, index) in panels"
                :key="`${screen}-${index}`"
                :style="`background: var(${screen});`"
            />
        </div>
    </div>
</template>
