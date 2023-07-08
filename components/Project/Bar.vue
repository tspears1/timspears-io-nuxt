<script setup>
import { inView } from 'motion'

const props = defineProps({
    client: String,
    year: [Number, String],
    services: Array,
})

const counter = ref()

const { serviceIconLabels } = useIcons()

const getLabel = (slug) => serviceIconLabels.filter((item) => item.slug === slug)[0].label

onMounted(() => {
    inView(counter.value.$el, () => counter.value.toggle(), { amount: 0.4 })
})

</script>

<template>
    <section class="project-bar">
        <div class="project-bar__cell project-bar__cell--client">
            <div class="project-bar__label">
                Client
            </div>
            <div class="project-bar__text">
                {{ props.client }}
            </div>
        </div>
        <div class="project-bar__cell project-bar__cell--year">
            <div class="project-bar__label">
                Year
            </div>
            <div class="project-bar__text">
                <Counter class="project-bar__counter" :value="props.year" ref="counter"/>
            </div>
        </div>
        <div class="project-bar__cell project-bar__cell--skills">
            <div class="project-bar__label">
                Skills
            </div>
            <div class="project-bar__group">
                <span class="project-bar__tag" v-for="(skill, index) in props.services" :key="index">
                    {{ getLabel(skill) }}
                </span>
            </div>
        </div>
    </section>
</template>