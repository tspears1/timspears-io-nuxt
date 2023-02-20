<template>
    <SiteSvgStore />
    <SiteWrapper>
        <SiteHeader />
        <DebugStylesheet />
        <!-- <SiteMenu /> -->
    </SiteWrapper>
</template>

<script setup>
import { useGlobalData } from '@data/global'
const { theme: siteTheme } = useTheme()
const { data } = useGlobalData()

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

