<script setup>
const props = defineProps({
    content: {
        type: Object,
        required: true,
    }
})

const { heading, text } = props.content

const { serviceIcons } = useIcons()

</script>

<template>
    <section class="section services-block" section-theme="dark" section-layout="columns-reverse">
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
                    <component :is="service.icon" />
                </div>
            </li>
        </ul>
    </section>
</template>