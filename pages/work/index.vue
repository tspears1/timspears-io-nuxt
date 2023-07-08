<script setup>
import { animate } from 'motion'
import { useFilterStore } from '~/stores/filters'
import { storeToRefs } from 'pinia'

const filters = useFilterStore()
const { cards } = storeToRefs(filters)

const { data } = useSanityQuery(groq`
    *[_type == "page" && pageTemplate == 'works-template']{
        "pageTitle": title,
        eyebrow,
    }[0]
`)

const bar = ref()

onMounted(() => {
    filters.resetFilter()
})

const onEnter = (el, done) => {
    animate(
        el,
        { opacity: [0, 1] },
        { duration: 1, easing: cubicBezier.easeOutQuint }
    ).finished.then(() => done())
}

const onBeforeLeave = (el) => {
    el.style.height = el.offsetHeight + 'px'
    el.style.width = el.offsetWidth + 'px'
}

const onLeave = (el, done) => {
    animate(
        el,
        { opacity: [1, 0] },
        { duration: 1, easing: cubicBezier.easeOutQuint }
    ).finished.then(() => done())
}

const onAfterLeave = (el) => {
    el.style.height = null
    el.style.width = null
}

</script>

<template>
    <main class="page-wrapper">
        <Hero v-if="data" :title="data.pageTitle ?? null" :eyebrow="data.eyebrow"/>
        <FilterBar ref="bar"/>
        <section id="filter-grid" class="section" section-theme="dark-matrix">
            <TransitionGroup
                tag="div"
                name="filter-grid"
                class="filter-grid"
                v-if="cards"
                @enter="onEnter"
                @leave="onLeave"
                @before-leave="onBeforeLeave"
                @after-leave="onAfterLeave"
            >
                <FilterCard
                    v-for="(card, index) in cards"
                    :key="card.url"
                    :card="card"
                    :card-index="index + 1"
                />
            </TransitionGroup>
        </section>
        <FilterModal ref="modal" />
    </main>
</template>