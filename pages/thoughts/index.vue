<template>
    <main class="page-wrapper">
        <Hero
            v-if="data"
            :title="data.pageTitle"
            :eyebrow="data.eyebrow"
            :compressed="true"
        />
    </main>
</template>

<script setup>
const { data } = useSanityQuery(groq`
    *[_type == "page" && slug.current == 'thoughts']{
        "pageTitle": title,
        eyebrow,
        heroSize,
    }[0]
`)

</script>