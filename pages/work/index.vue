<template>
    <main class="page-wrapper">
        <Hero v-if="data" :title="data.pageTitle ?? null" :eyebrow="data.eyebrow"/>
    </main>
</template>

<script setup>
const { data } = useSanityQuery(groq`
    *[_type == "page" && slug.current == 'work']{
        "pageTitle": title,
        eyebrow
    }[0]
`)

</script>