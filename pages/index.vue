<template>
    <main class="page-wrapper">
        <Hero v-if="data" :title="data.pageTitle ?? null" :billboard="true" :eyebrow="data.eyebrow"/>
    </main>
</template>

<script setup>
const { data } = useSanityQuery(groq`
    *[_type == "home"]{
        "pageTitle": title,
        eyebrow
    }[0]
`)

useHead({
    title: 'Home',
})

</script>