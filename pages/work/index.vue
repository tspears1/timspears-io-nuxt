<script setup>
const { data } = useSanityQuery(groq`
    *[_type == "page" && slug.current == 'work']{
        "pageTitle": title,
        eyebrow
    }[0]
`)

const cards = [
    {
        eyebrow: 'Website Redesign',
        title: 'myOrthos',
        url: 'https://www.imdb.com',
        services: ['frontend', 'motion'],
        image: 'https://source.unsplash.com/random/800x800/?scifi/'
    },
    {
        eyebrow: 'Icon Set',
        title: 'Cookie Jar Kitchen',
        url: 'https://www.imdb.com',
        services: ['graphic', 'backend', 'frontend', 'web', 'motion', 'brand'],
        image: 'https://source.unsplash.com/random/800x800/?woods/'
    },
    {
        eyebrow: 'Website Redesign',
        title: 'Ember Gardens',
        url: 'https://www.imdb.com',
        services: ['backend', 'frontend', 'web', 'motion'],
        image: 'https://source.unsplash.com/random/800x800/?space/'
    },
    {
        eyebrow: 'Brand New Logo',
        title: 'Marge Bar',
        url: 'https://www.imdb.com',
        services: ['brand'],
        image: 'https://source.unsplash.com/random/800x800/?hipster/'
    },
]

</script>

<template>
    <main class="page-wrapper">
        <Hero v-if="data" :title="data.pageTitle ?? null" :eyebrow="data.eyebrow"/>
        <FilterBar />
        <section class="section section--dark-matrix">
            <div class="filter-grid">
                <FilterCard
                    v-for="card in cards"
                    :key="card.title"
                    :card="card"
                />
            </div>
        </section>
        <FilterModal />
    </main>
</template>