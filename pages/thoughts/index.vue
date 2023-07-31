<script setup>
import { useThoughtsData } from '~/data/thoughts'

const { data } = useThoughtsData()

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

const articlesByDate = computed(() => {
    if (!data) return []
    return data.value?.articles.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })
})

</script>

<template>
    <main class="page-wrapper">
        <Hero
            v-if="data"
            :title="data?.pageTitle"
            :eyebrow="data?.eyebrow"
            :compressed="true"
        />
        <BlockDesigner
            :content="data?.content ?? []"
            v-if="data"
        />
        <section class="section article-list-block section--tight" section-theme="light">
            <div class="article-list-block__grid">
                <ul class="article-list-block__list">
                    <li
                        v-for="article in articlesByDate"
                        :key="article._id"
                        class="article-list-block__item"
                    >
                        <div class="article-list-block__article">
                            <div class="article-list-block__meta">
                                <div class="article-list-block__date">
                                    <time>{{ getDate(article.date) }}</time>
                                </div>
                                <div v-if="article.publication" class="article-list-block__publication">
                                    <span>{{ article.publication }}</span>
                                </div>
                            </div>
                            <div class="article-list-block__content">
                                <div class="article-list-block__title">
                                    <h3>{{ article.title }}</h3>
                                </div>
                                <div class="article-list-block__excerpt">
                                    <p>{{ article.abstract }}</p>
                                </div>
                                <div class="article-list-block__link">
                                    <Button
                                        :url="article.url || `/thoughts/${article.slug}`"
                                        class="section-button article-list-block__button"
                                        icon="arrow-right"
                                        :target="!!article.url"
                                        text="View the Article"
                                    />
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </main>
</template>