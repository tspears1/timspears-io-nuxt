<script setup>
const { data } = useSanityQuery(groq`
    *[_type == "page" && slug.current == 'thoughts']{
        "pageTitle": title,
        eyebrow,
        heroSize,
        'articles' : articles[] -> {
            _type == 'object' => {
                title,
                url,
                publication,
                abstract,
                date,
            },

            _type == 'article' => {
                title,
                eyebrow,
                slug,
                date,
                abstract,
            }
        }

    }[0]
`)

useHead({
    title: 'Thoughts',
})

</script>

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