<template>
    <header class="site-header">
        <NuxtLink to="/" class="site-logo">
            <span class="sr-only">
                {{  data.siteTitle }}
            </span>
            <IconLogo />
        </NuxtLink>
        <div class="site-eyebrow">
            {{  data.siteEyebrow }}
        </div>
        <div class="site-menu-trigger">
            <IconMenu />
        </div>
    </header>
</template>

<script setup>
const { data } = useSanityQuery(groq`
    *[_type == "settings"]{
        siteTitle,
        siteEyebrow,
    }[0]
`)
</script>