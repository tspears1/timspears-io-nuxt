<template>
    <main class="page-wrapper">
        <Hero :title="data.title" :large-text="true" />
    </main>
</template>

<script setup>

const { data } = useSanityQuery(groq`
    *[_type == "home"]{
        title
    }[0]
`)

useHead({
    meta: [{ name: 'theme-color', content: '#B2841C' }] // add to new useTheme state.
})


</script>