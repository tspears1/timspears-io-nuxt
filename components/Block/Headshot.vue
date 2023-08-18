<script setup>
import { animate, inView } from 'motion'

const blockRef = ref(null)
const mediaRef = ref(null)

const props = defineProps({
    content: {
        type: Object,
        required: true,
    }
})

const {
    eyebrow,
    heading,
    content,
    headshot,
    layout,
    theme,
} = props.content

onMounted(() => {
    inView(blockRef.value, () => {
        animate(mediaRef.value, { clipPath: ['inset(0 100%)', 'inset(0 0)'] }, { duration: 1.5, easing: 'steps(12, start)' })

        return () => {
            animate(mediaRef.value, { clipPath: ['inset(0 0)', 'inset(0 100%)'] }, { duration: 1.5, easing: 'steps(12, end)' })
        }
    }, { amount: 0.5 })
})

</script>
<template>
    <section
        class="section headshot-block"
        :section-theme="theme"
        :section-layout="layout"
        ref="blockRef"
    >

        <div class="headshot-block__content">
            <Eyebrow
                v-if="eyebrow"
                v-bind="eyebrow"
                :offset="0.5"
                class="section__eyebrow headshot-block__eyebrow"
            />

            <h3
                class="section__heading headshot-block__heading"
                :heading-size="heading.size"
                :heading-style="heading.style"
            >
                <TextMotion
                    v-if="heading?.text"
                    :text="heading.text"
                    exit
                    :stagger="0.035"
                    :duration="0.5"
                    :inview="0.95"
                    transition-type="letter"
                    :transition-name="['slide-up', 'slide-down']"
                />
            </h3>

            <div v-if="content" class="section__content headshot-block__text rich-text">
                <TextContent :blocks="content" />
            </div>
        </div>
        <div class="headshot-block__media" ref="mediaRef">
            <SanityImage
                v-if="headshot"
                block="headshot-block"
                :src="headshot"
            />
        </div>

    </section>
</template>