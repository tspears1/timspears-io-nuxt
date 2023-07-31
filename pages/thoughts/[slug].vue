<script setup>
import { useArticleData } from '../../data/article'
const route = useRoute()
const { data } = useArticleData(route.params.slug)

const title = route.path
    .replace('/work/', '')
    .replace(/-/g, ' ')
    .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))

useHead({
    title: title,
})

</script>
<template>
    <main class="page-wrapper">
        <h1>{{ data?.title }}</h1>
    </main>
</template>