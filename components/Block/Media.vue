<script setup>
const props = defineProps({
    content: {
        type: Object,
        required: true,
    }
})

const { heading, media } = props.content

</script>
<template>
    <section class="section media-block" section-theme="light">
        <h3
            v-if="heading"
            class="section__heading media-block__heading"
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
        <div class="section__content media-block__content">

        </div>
    </section>
</template>