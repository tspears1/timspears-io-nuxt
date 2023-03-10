<script setup>
import { usePortalStore, usePageContextStore } from '~/stores/portal'
import { storeToRefs } from 'pinia'

const { lockScreen, unlockScreen } = useScreenLock()
const { setActiveTheme } = useThemes()

const portal = usePortalStore()
const { portalActive, transitionCompleted } = storeToRefs(portal)

const context = usePageContextStore()
const { pageContext } = storeToRefs(context)

onMounted(() => {
    lockScreen()

    setTimeout(() => { // replace with animation
        portal.isLoaded()
        portalActive.value = true
        setActiveTheme(pageContext.value.next.theme)
    }, 5000)
})


watch(transitionCompleted, (value) => {
    if (!!value) {
        unlockScreen()
        portalActive.value = false
    }
})

</script>

<template>
    <div class="loading-screen">
        <h2>Loading.......</h2>
    </div>
</template>