<template>
    <SiteWrapper>
        <SiteHeader v-if="isMounted" />
        <SiteMenu v-if="isMounted" />
        <NuxtPage />
        <DebugQuickLinks />
        <DebugColorsheet />
        <DebugStylesheet />
        <SiteFooter v-if="isMounted" />
        <SitePortal v-if="isMounted" />
    </SiteWrapper>
</template>

<script setup>
import { useGlobalData } from '@/data/global'
import { usePageContextStore } from "~~/stores/portal"

const isMounted = ref(false)

const context = usePageContextStore()
const { activeTheme, buildStyleSheet, buildThemes, buildThemeIndex, getEntryThemeIndex } = useThemes()
const { data } = useGlobalData()
const { initLenis } = useLenis()
const route = useRoute()
useFrame()

useHead({
    htmlAttrs: {
        class: 'root',
        'data-theme': () => activeTheme.value?.slug ?? 'base',
        'data-loaded': false,
    },
    title: '',
    titleTemplate: (pageTitle) => !pageTitle ? data.value.siteTitle : `${pageTitle} | ${data.value.siteTitle}`,
    meta: [{ name: 'theme-color', content: () => activeTheme.value?.base ?? '#000' }]
})

onBeforeMount(async () => {
    await buildThemes()
    await buildThemeIndex()
    await buildStyleSheet()
    const entry = getEntryThemeIndex({name: route.name })
    await context.updateNextContext(entry)
})

onMounted(() => {
    isMounted.value = true
    console.warn('App Mounted')
    initLenis()
})

</script>

