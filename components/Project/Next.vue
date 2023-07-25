<script setup>
import { useFilterStore } from '~/stores/filters'
import { storeToRefs } from 'pinia'
import ArrowRightIcon from '~/assets/svgs/button/arrow-right.svg'
import { animate, scroll, stagger } from 'motion'

const route = useRoute()
const projects = useFilterStore()
const { cards } = storeToRefs(projects)

const nextProject = computed(() => {
    const index = cards.value.findIndex(card => card.url.includes(route.params.slug))
    return index == cards.value.length - 1 ? cards.value[0] : cards.value[index + 1]
})

const resolveUrl = (url) => url?.replace(/(?:\/?work\/)/gm, '')

const blockRef = ref()
const viewProgress = ref(0)
const viewPercent = computed(() => (viewProgress.value).toFixed(4))

const backRef = ref()
const backArrowRef = ref()
const backLetters = computed(() => backRef.value.letters)

const onBackHover = () => {
    animate([backArrowRef.value, ...backLetters.value], { y: ['0%', '-100%', '0%'] }, { delay: stagger(0.025, { from: 'last'}) })
}

onMounted(() => {
    scroll(({ y }) => {
        viewProgress.value = y.progress
    }, { target: blockRef.value, offset: ['start end', 'end end'] })
})

</script>

<template>
    <section
        v-if="nextProject"
        class="section project-next section--flush"
        section-theme="light"
        ref="blockRef"
        :style="`--view-progress: ${viewPercent}`"
    >
        <div class="project-next__grid">
            <div class="project-next__content">
                <div class="project-next__text">
                    <Eyebrow
                        text="Next Project"
                        :offset="0.5"
                        class="section__eyebrow project-next__eyebrow"
                    />
                    <h3
                        v-if="nextProject.realTitle"
                        class="section__heading project-next__heading"
                        heading-style="poster"
                        heading-size="h3"
                    >
                        <TextMotion
                            :text="nextProject.realTitle"
                            exit
                            :stagger="0.035"
                            :duration="0.5"
                            :inview="0.95"
                            transition-type="letter"
                            :transition-name="['slide-up', 'slide-down']"
                        />
                    </h3>
                    <Button
                        v-if="nextProject.url"
                        text="View Project"
                        :url="resolveUrl(nextProject.url)"
                        class="section__button project-next__button"
                        icon="arrow-right"
                        theme="dark"
                    />
                </div>
                <div class="project-next__footer">
                    <NuxtLink
                        to="/work"
                        class="project-next__link"
                        @mouseenter="onBackHover"
                    >
                        <span class="project-next__link-icon" ref="backArrowRef">
                            <ArrowRightIcon />
                        </span>
                        <span class="project-next__link-text">
                            <TextSplitting ref="backRef" content="Back to All Projects" block="project-next" />
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