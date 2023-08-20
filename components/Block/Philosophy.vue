<script setup>
import { inView } from 'motion'

const props = defineProps({
    content: {
        type: Object,
        required: true,
    }
})

const {
    eyebrow,
    heading,
    values,
    theme,
    layout
} = props.content

const blockRef = ref(null)
const visible = ref(false)

const splitTitle = computed(() => heading?.split(' '))

onMounted(() => {
    inView(blockRef.value, () => {
        visible.value = true

        return () => {
            visible.value = false
        }
    }, { amount: 0.5 })
})
</script>

<template>
    <section
        class="section philosophy-block"
        :class="{'in-view': visible }"
        :section-theme="theme"
        :section-layout="layout"
        ref="blockRef"
    >
        <div class="philosophy-block__heading">
            <Eyebrow
                v-if="eyebrow"
                v-bind="eyebrow"
                :offset="0.5"
                class="section__eyebrow philosophy-block__eyebrow"
            />
            <h2
                class="philosophy-block__title"
                v-if="heading"
            >
                <div
                    v-for="(word, index) in splitTitle"
                    class="philosophy-block__title-wrapper"
                    :style="`--index: ${index + 1}`"
                >
                    <span>{{ word }}</span>
                </div>
            </h2>
        </div>
        <div class="philosophy-block__content">
            <ol class="philosophy-block__list">
                <li
                    v-for="(value, index) in values"
                    class="philosophy-block__item"
                >
                    <div class="philosophy-block__value">
                        {{  value.title }}
                    </div>
                    <div class="philosophy-block__tag">
                        <TextContent :blocks="value.content" />
                    </div>
                </li>
            </ol>
        </div>
    </section>
</template>