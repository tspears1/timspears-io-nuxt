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
import { useGlobalData } from '@data/global'
const { theme: siteTheme } = useTheme()
const { data } = useGlobalData()
useFrame()


useHead({
    htmlAttrs: {
        class: 'root',
        'data-theme': siteTheme,
    },
    title: '',
    titleTemplate: (title) => !title ? data.value.siteTitle : `${title} | ${data.value.siteTitle}`
})


onMounted(() => {
    useLenis()
})

</script>

