<script setup>
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

const cards = computed(() => data.value.cards.map(card => ({
    url: card.url,
    image: card.image,
    services: card.services,
    title: card.cardTitle ?? card.title,
    eyebrow: card.cardEyebrow ?? card.eyebrow
})))

</script>

<template>
    <main class="page-wrapper">
        <Hero v-if="data" :title="data.pageTitle ?? null" :eyebrow="data.eyebrow"/>
        <FilterBar />
        <section class="section section--dark-matrix">
            <div class="filter-grid" v-if="cards">
                <FilterCard
                    v-for="card in cards"
                    :key="card.url"
                    :card="card"
                />
            </div>
        </section>
        <FilterModal />
    </main>
</template>