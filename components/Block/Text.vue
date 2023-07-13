<script setup>
const props = defineProps({
    content: {
        type: Object,
        required: true,
    }
})

const {
    heading,
    spotlight,
    content,
    theme,
} = props.content

</script>
<template>
    <section
        class="section text-block"
        :section-theme="theme ?? 'light'"
        :block-style="spotlight ? 'spotlight' : null"
        section-layout="stacked"
    >
        <h3
            v-if="heading"
            class="section__heading text-block__heading"
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
                :transition-name="['slide-left', 'slide-right']"
            />
        </h3>
        <div
            v-if="content"
            class="section__content text-block__content rich-text"
        >
            <TextContent :blocks="content" />
        </div>
    </section>
</template>