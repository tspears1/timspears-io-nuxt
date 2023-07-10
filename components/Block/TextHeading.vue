<script setup>
const props = defineProps({
    content: {
        type: Object,
        required: true,
    }
})

const {
    sectionEyebrow: eyebrow,
    sectionHeading: heading,
    contentFull: content,
    alignmentX,
    alignmentY,
    invertTheme,
} = props.content

</script>
<template>
    <section
        class="section text-heading-block"
        :section-theme="invertTheme ? 'dark' : 'light'"
        :section-layout="alignmentX ? 'columns-reverse' : 'columns'"
        :section-alignment="alignmentY ? 'end' : 'start'"
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