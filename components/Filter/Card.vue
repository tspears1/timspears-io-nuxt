<script setup>
import { FastAverageColor } from 'fast-average-color'
import { list, random } from 'radash'

const { icons } = useButton()
const fac = new FastAverageColor()

const props = defineProps({
    card: Object,
})

const ignored = [
    [255, 255, 255, 255], // white
    [0, 0, 0, 255] // black
]

const imageRef = ref()
const panelColor = ref()

const panelGroup = computed(() => list(0, 64, () => random(10, 75) * 0.01))

onMounted(() => {
    nextTick(() => {
        fac.getColorAsync(imageRef.value, {
            ignoredColor: ignored,
            algorithm: 'sqrt'
        }).then(color => panelColor.value = color.value.slice(0, -1))
    })
})

</script>

<template>
    <article class="filter-card">
        <div class="filter-card__content">
            <div class="filter-card__wrapper">
                <div class="filter-card__mask">
                    <div class="filter-card__header">
                        <div class="filter-card__eyebrow">
                            {{ card.eyebrow }}
                        </div>
                        <div class="filter-card__services">
                            <IconService
                            v-for="service in card.services"
                            :key="`${service}-${card.title}`"
                            :icon="service"
                            class="filter-card__icon"
                            />
                        </div>
                    </div>

                    <h3 class="filter-card__title">
                        <a
                            :href="card.url"
                            class="filter-card__link"
                        >
                            {{ card.title }}
                        </a>
                    </h3>

                    <div class="filter-card__cta">
                        <span class="filter-card__cta-text">View Project</span>
                        <div class="filter-card__cta-icon">
                            <component :is="icons.arrowRight" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="filter-card__media">
            <div class="filter-card__panels">
                <div
                    class="filter-card__panel"
                    v-for="(alpha, index) in panelGroup"
                    :key="`${alpha}--${index}`"
                    :style="`--card-panel-bg: ${panelColor}; --card-panel-alpha: ${alpha};`"
                />
            </div>
            <img
                class="filter-card__img lazyload"
                ref="imageRef"
                :src="card.image"
                crossorigin="anonymous"
            />
        </div>
    </article>
</template>