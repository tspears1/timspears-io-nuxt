<template>
    <SiteWrapper>
        <SiteHeader v-if="isMounted" />
        <SiteMenu v-if="isMounted" />
        <NuxtPage />
        <SiteFooter v-if="isMounted" />
        <SitePortal v-if="isMounted" />
    </SiteWrapper>
</template>

<script setup>
// import 'container-query-polyfill'
import 'lazysizes'
import 'what-input'
import { useGlobalData } from '@/data/global'
import { usePageContextStore } from "~~/stores/portal"
import { useThemeStore } from '~~/stores/theme'

const isMounted = ref(false)

const context = usePageContextStore()
const theme = useThemeStore()
const { activeTheme, buildStyleSheet, buildThemes } = useThemes()
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
    console.log(route.path)
    await buildThemes()
    await theme.buildThemeIndex()
    await buildStyleSheet()
    const entry = theme.getEntryThemeIndex({path: route.path })
    await context.updateNextContext(entry)
})

onMounted(() => {
    isMounted.value = true
    console.warn('App Mounted')
    initLenis()
})

</script>

