<script setup>
import { list, random } from 'radash'
import { hexToRGB } from '@/utils/color'

const { icons } = useButton()

const props = defineProps({
    card: Object,
})

const panelGroup = computed(() => list(0, 64, () => random(10, 75) * 0.01))

const panelColor = computed(() => {
    const rgbArray = hexToRGB( props.card.image?.metadata?.palette?.dominant?.background )
    return rgbArray ? rgbArray.join(', ') : null
})

const isLoaded = ref(false)

</script>

<template>
    <article class="filter-card" :data-blur="!isLoaded">
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
            <SanityImage
                picture-class="filter-card__picture"
                image-class="filter-card__img"
                :src="card.image"
                :callback="() => isLoaded = true"
            />
        </div>
    </article>
</template>