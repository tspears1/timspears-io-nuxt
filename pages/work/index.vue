<script setup>
import { useFilterStore } from '~/stores/filters'
import { storeToRefs } from 'pinia'

const filters = useFilterStore()
const { selectedFilter } = storeToRefs(filters)
const { serviceIconSlugs } = useIcons()

const { data } = useSanityQuery(groq`
    *[_type == "page" && pageTemplate == 'works-template']{
        "pageTitle": title,
        eyebrow,
        'cards': activeProjects[] -> {
            'url': 'work/' + slug.current,
            'image': cardImage.asset->,
            title,
            cardTitle,
            eyebrow,
            cardEyebrow,
            'services': projectSkills[] -> slug.current
        }
    }[0]
`)

const cards = computed(() => {
    const stack = data.value.cards.map(card => ({
        url: card.url,
        image: card.image,
        services: card.services,
        title: card.cardTitle ?? card.title,
        eyebrow: card.cardEyebrow ?? card.eyebrow,
        awarded: false,
    }))

    return selectedFilter.value == 'awarded'
        ? stack.filter(card => !!card.awarded)
        : serviceIconSlugs.includes( selectedFilter.value)
            ? stack.filter(card => card.services.includes( selectedFilter.value ))
            : stack
})

</script>

<template>
    <main class="page-wrapper">
        <Hero v-if="data" :title="data.pageTitle ?? null" :eyebrow="data.eyebrow"/>
        <FilterBar />
        <section class="section section--dark-matrix">
            <div class="filter-grid" v-if="cards">
                <KeepAlive>
                    <FilterCard
                        v-for="(card, index) in cards"
                        :key="card.url"
                        :card="card"
                        :index="index + 1"
                    />
                </KeepAlive>
            </div>
        </section>
        <FilterModal />
    </main>
</template>