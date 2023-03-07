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

    titleTemplate: (title) => !title ? data.value.siteTitle : `${title} | ${data.value.siteTitle}`,
    meta: [{ name: 'theme-color', content: () => activeTheme.value?.base ?? '#000' }]
})

watch(activeTheme, (newTheme) => {
    console.log('watching new theme: ', newTheme)
    if (newTheme) {
        useHead({
            meta: [{ name: 'theme-color', content: newTheme.base }]
        })

        console.warn(`[Head - Meta]: Theme color changed: ${newTheme.base}`)
    }
})

onBeforeMount(async ()=> {
    await buildThemes()
    await buildThemeIndex()
    await buildStyleSheet()
    await setActiveTheme(getEntryThemeIndex({name: route.name }).theme)
})

onMounted(() => {
    console.warn('App Mounted')
    initLenis()
})

</script>

