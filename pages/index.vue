<template>
    <main class="page-wrapper">
        <Hero :title="data.title" :billboard="true" eyebrow="Tim Spears"/>
    </main>
</template>

<script setup>
const { data } = useSanityQuery(groq`
    *[_type == "home"]{
        title
    }[0]
`)

definePageMeta({
    title: 'Home',
    theme: 'laconia',
})
</script>