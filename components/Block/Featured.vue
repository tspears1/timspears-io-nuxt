<script setup>
import { useFilterStore } from '~/stores/filters'
import { storeToRefs } from 'pinia'
import ArrowRightIcon from '~/assets/svgs/button/arrow-right.svg'
import { animate, scroll, stagger, timeline } from 'motion'
import { useViewportStore } from '~/stores/viewport'

const viewport = useViewportStore()
const props = defineProps({
    content: {
        type: Object,
        required: true,
    }
})

const { project } = props.content

const blockRef = ref()
const contentRef = ref()
const mediaRef = ref()
const screenRef = ref()

const sequence = computed(() => {
    const mobileSeq = [
        [contentRef.value, { x: [0, 0], y: ['-50%', 0] }, { at: 0 }],
        [screenRef.value, { x: [0, 0], y: ['-75%', 0] }, { at: 0 }]
    ]

    const desktopSeq = [
        [contentRef.value, { y: [0, 0], x: ['-50%', 0] }, { easing: cubicBezier.easeOutCubic, at: 0 }],
        [screenRef.value, { y: [0, 0], x: ['-75%', 0] }, { easing: cubicBezier.easeOutCubic, at: 0 }]
    ]

    const img = mediaRef.value.querySelector('img')
    const mediaSeq = [[img, { opacity: [0, 1], scale: [1.3, 1] }, { easing: cubicBezier.easeOutQuart, at: 0.05 }]]

    return viewport.breakpoints.smaller('md').value ? [...mediaSeq] : [...desktopSeq, ...mediaSeq]
})

const backRef = ref()
const backArrowRef = ref()
const backLetters = computed(() => backRef.value.letters)

const onBackHover = () => {
    animate([...backLetters.value, backArrowRef.value], { y: ['0%', '-100%', '0%'] }, { delay: stagger(0.025, { from: 'first'}) })
}

onMounted(() => {
    scroll(timeline(sequence.value), { target: blockRef.value, offset: ['0.25 1', 'end end'] })
})

</script>

<template>
    <section
        v-if="project"
        class="section project-next section--flush"
        section-theme="light"
        ref="blockRef"
    >
        <div class="project-next__grid">
            <div class="project-next__content" ref="contentRef">
                <div class="project-next__screen" ref="screenRef" />
                <div class="project-next__text">
                    <Eyebrow
                        text="Featured Project"
                        :offset="0.5"
                        class="section__eyebrow project-next__eyebrow"
                    />
                    <h3
                        v-if="project.title"
                        class="section__heading project-next__heading"
                        heading-style="poster"
                        heading-size="h3"
                    >
                        <TextMotion
                            :text="project.title"
                            exit
                            :stagger="0.035"
                            :duration="0.5"
                            :inview="0.95"
                            transition-type="letter"
                            :transition-name="['slide-up', 'slide-down']"
                        />
                    </h3>
                    <Button
                        v-if="project.slug"
                        text="View Project"
                        :url="`work/${project.slug}`"
                        class="section__button project-next__button"
                        icon="arrow-right"
                        theme="dark"
                    />
                </div>
                <div class="project-next__footer">
                    <NuxtLink
                        to="/work"
                        class="project-next__link project-next__link--reversed"
                        @mouseenter="onBackHover"
                    >
                        <span class="project-next__link-text">
                            <TextSplitting ref="backRef" content="View All Projects" block="project-next" />
                        </span>
                        <span class="project-next__link-icon" ref="backArrowRef">
                            <ArrowRightIcon />
                        </span>
                    </NuxtLink>
                </div>
            </div>
            <div class="project-next__media" v-if="project.media" ref="mediaRef">
                <SanityImage
                    block="project-next"
                    :src="project.media.image"
                />
            </div>
        </div>
    </section>
</template>