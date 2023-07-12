<script setup>
const props = defineProps({
    content: {
        type: Object,
        required: true,
    }
})

const {
    eyebrow,
    heading,
    button,
    content,
    layout,
    theme,
} = props.content


</script>
<template>
    <section
        class="section project-intro-block"
        :section-theme="theme"
        :section-layout="layout"
    >
        <Eyebrow
            v-if="eyebrow"
            v-bind="eyebrow"
            :offset="0.5"
            class="section__eyebrow project-intro-block__eyebrow"
        />

        <h2
            v-if="heading?.text"
            class="section__heading project-intro-block__heading"
            :heading-size="heading.size"
            :heading-style="heading.style"
        >
            <TextMotion
                :text="heading.text"
                exit
                :stagger="0.035"
                :duration="0.5"
                :inview="0.95"
                transition-type="letter"
                :transition-name="['slide-up', 'slide-down']"
            />
        </h2>

        <div v-if="content" class="section__content project-intro-block__content rich-text">
            <TextContent :blocks="content" />
        </div>

        <Button
            v-if="button"
            v-bind="button"
            class="section__button project-intro-block__button"
            icon="arrow-right"
            :theme="theme == 'dark' ? 'light' : 'dark'"
        />

    </section>
</template>