<template>
    <SiteWrapper>
        <SiteHeader />
        <SiteMenu />
        <NuxtPage />
        <DebugColorsheet />
        <DebugStylesheet />
        <SiteFooter />
        <SitePortal />
    </SiteWrapper>
</template>

<script setup>
import { useGlobalData } from '@/data/global'
import { usePageContextStore } from "~~/stores/portal"

const context = usePageContextStore()
const { activeTheme, setActiveTheme, buildStyleSheet, buildThemes, buildThemeIndex, getEntryThemeIndex } = useThemes()
const { data } = useGlobalData()
const { initLenis } = useLenis()
const route = useRoute()
useFrame()

useHead({
    htmlAttrs: {
        class: 'root',
        'data-theme': () => activeTheme.value?.slug ?? 'base',
    },
    title: '',
    titleTemplate: (title) => !title ? data.value.siteTitle : `${title} | ${data.value.siteTitle}`,
    meta: [{ name: 'theme-color', content: () => activeTheme.value?.base ?? '#000' }]
})

onBeforeMount(async () => {
    await buildThemes()
    await buildThemeIndex()
    await buildStyleSheet()
    const entry = getEntryThemeIndex({name: route.name })
    await context.updateNextContext(entry)
    await setActiveTheme(entry.theme) // change once loading screen is working
})

onMounted(() => {
    console.warn('App Mounted')
    initLenis()
})

</script>

