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
const { activeTheme, buildStyleSheet, buildThemes } = useThemes()
const { data } = useGlobalData()
const { initLenis } = useLenis()
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

watch(activeTheme, (newTheme) => {
    console.log(newTheme)
    // useHead({
    //     meta: [{ name: 'theme-color', content: newTheme.value.base }]
    // })

    //console.warn(`[Head - Meta]: Theme color changed: ${newTheme.value.base}`)
})

onMounted(() => {
    initLenis()
    buildThemes()
    buildStyleSheet()
})

</script>

