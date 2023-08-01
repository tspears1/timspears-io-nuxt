<script setup>
import { scroll, animate, stagger } from 'motion'
const props = defineProps({
    content: {
        type: Object,
        required: true,
    }
})

const { heading, text } = props.content
const { serviceIcons } = useIcons()

const iconFrameRef = ref(null)
const blockRef = ref(null)

onMounted(() => {
    scroll(animate(iconFrameRef.value, { rotate: [-45, 25] }, { delay: stagger(0.025)}),
    { target: blockRef.value, offset: ['0.25 1', 'end end']})
})

</script>

<template>
    <section
        class="section services-block"
        section-theme="dark"
        section-layout="columns-reverse"
        ref="blockRef"
    >
        <div class="services-block__header">
            <h3
                v-if="heading.text"
                class="section__heading services-block__heading"
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
            <div class="services-block__text">
                {{  text  }}
            </div>
        </div>
        <ul class="services-block__grid">
            <li
                v-for="service in serviceIcons"
                :key="service.slug"
                class="services-block__item"
            >
                <div class="services-block__label">
                    {{  service.label }}
                </div>
                <div class="services-block__icon">
                    <div class="services-block__icon-frame" ref="iconFrameRef"/>
                    <component :is="service.icon" />
                </div>
            </li>
        </ul>
    </section>
</template>