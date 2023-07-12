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
    content,
    layout,
    alignment,
    theme,
} = props.content

</script>
<template>
    <section
        class="section text-heading-block"
        :section-theme="theme"
        :section-layout="layout"
        :section-alignment="alignment"
    >
        <Eyebrow
            v-if="eyebrow"
            v-bind="eyebrow"
            :offset="0.5"
            class="section__eyebrow text-heading-block__eyebrow"
        />

        <h3
            class="section__heading text-heading-block__heading"
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

        <div v-if="content" class="section__content text-heading-block__content rich-text">
            <TextContent :blocks="content" />
        </div>

    </section>
</template>