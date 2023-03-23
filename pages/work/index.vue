<script setup>
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

const onEnter = (el, done) => {
    console.log({el}, 'entering')
    done()
}

const onLeave = (el, done) => {
    console.log({el}, 'leaving')
    done()
}

</script>

<template>
    <main class="page-wrapper">
        <Hero v-if="data" :title="data.pageTitle ?? null" :eyebrow="data.eyebrow"/>
        <FilterBar ref="bar"/>
        <section id="filter-grid" class="section section--dark-matrix">
            <TransitionGroup
                tag="div"
                name="filter-grid"
                class="filter-grid"
                v-if="cards"
                @enter="onEnter"
                @leave="onLeave"
            >
                <FilterCard
                    v-for="(card, index) in cards"
                    :key="card.url"
                    :card="card"
                    :index="index + 1"
                />
            </TransitionGroup>
        </section>
        <FilterModal ref="modal" />
    </main>
</template>