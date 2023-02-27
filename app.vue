<template>
    <SiteWrapper>
        <SiteHeader />
        <SiteMenu />
        <NuxtPage />
        <DebugStylesheet />
        <SiteFooter />
    </SiteWrapper>
</template>

<script setup>
import { useGlobalData } from '@/data/global'
const { theme: siteTheme } = useTheme()
const { data } = useGlobalData()
useFrame()
const { initLenis } = useLenis()


useHead({
    htmlAttrs: {
        class: 'root',
        'data-theme': siteTheme,
    },
    title: '',
    titleTemplate: (title) => !title ? data.value.siteTitle : `${title} | ${data.value.siteTitle}`
})


onMounted(() => {
    initLenis()
})

</script>

