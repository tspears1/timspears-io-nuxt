<script setup>
import { useFilterStore } from '~/stores/filters'
import { storeToRefs } from 'pinia'

const route = useRoute()
const projects = useFilterStore()
const { cards } = storeToRefs(projects)

const nextProject = computed(() => {
    const index = cards.value.findIndex(card => card.url.includes(route.params.slug))
    return index == cards.value.length - 1 ? cards.value[0] : cards.value[index + 1]
})

const resolveUrl = (url) => url?.replace(/(?:\/?work\/)/gm, '')

</script>

<template>
    <section v-if="nextProject" class="section project-next section--flush" section-theme="light">
        <div class="project-next__grid">
            <div class="project-next__content">
                <h2 class="project-next__label">Next Project</h2>
                <div class="project-next__eyebrow">{{ nextProject.eyebrow }}</div>
                <h3 class="project-next__title">{{ nextProject.title }}</h3>
                <Button
                    v-if="nextProject.url"
                    text="View Project"
                    :url="resolveUrl(nextProject.url)"
                    class="section__button project-next__button"
                    icon="arrow-right"
                    theme="dark"
                />
                <div class="project-next__footer">
                    <NuxtLink to="/work" class="project-next__link">
                        <span class="project-next__link-icon">

                        </span>
                        <span class="project-next__link-text">
                            Back to All Projects
                        </span>
                    </NuxtLink>
                </div>
            </div>
            <div class="project-next__media" v-if="nextProject.image">
                <SanityImage
                    block="project-next"
                    :src="nextProject.image"
                />
            </div>
        </div>
    </section>
</template>