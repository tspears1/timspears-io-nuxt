<script setup>
const { data } = useSanityQuery(groq`
    *[_type == "page" && slug.current == 'thoughts']{
        "pageTitle": title,
        eyebrow,
        heroSize,
        articles,
    }[0]
`)

useHead({
    title: 'Thoughts',
})

const getDate = (date) => {
    const dateObj = new Date(date)
    const month = dateObj.toLocaleString('default', { month: 'long' })
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    return `${month} ${day}, ${year}`
}

</script>

<template>
    <main class="page-wrapper">
        <Hero
            v-if="data"
            :title="data.pageTitle"
            :eyebrow="data.eyebrow"
            :compressed="true"
        />
        <section class="section article-list-block" section-theme="light">
            <div class="article-list-block__grid">
                <ul class="article-list-block__list">
                    <li
                        v-for="article in data.articles"
                        :key="article._id"
                        class="article-list-block__item"
                    >
                        <div>{{  getDate(article.date) }}</div>
                        <h3>{{  article.title }}</h3>
                        <div>{{  article.publication }}</div>
                        <div>{{ article.abstract }}</div>
                        <div>{{ article.url }}</div>
                    </li>
                </ul>
            </div>
        </section>
    </main>
</template>