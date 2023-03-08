<template>
    <main class="page-wrapper">
        <Hero :title="data.title" :billboard="true" eyebrow="Tim Spears"/>
    </main>
</template>

<script setup>
const { setActiveTheme } = useThemes()
const { data } = useSanityQuery(groq`
    *[_type == "home"]{
        title,
        "theme": pageTheme->slug.current
    }[0]
`)

definePageMeta({
    title: 'Home',
})

</script>