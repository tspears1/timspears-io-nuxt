<script setup>
import { list, random } from 'radash'
import { convertHSL } from '@/utils/color'

const { icons } = useButton()

const props = defineProps({
    card: Object,
    cardIndex: {
        type: Number,
        default: 1,
    },
})

const cardRef = ref()
const panelGroup = computed(() => list(0, 64, () => random(10, 75) * 0.01))

const panelColor = computed(() => convertHSL(props.card.image?.metadata?.palette?.dominant?.background ) ?? null )

const blurCard = ref(false)
const imageCallback = () => blurCard.value = false

</script>

<template>
    <article
        class="filter-card"
        :data-blur="blurCard"
        :style="`--card-panel-bg: ${panelColor}; --card-index: ${cardIndex};`"
        ref="cardRef"
    >
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
                        {{ card.title }}
                    </h3>

                    <div class="filter-card__cta">
                        <span class="filter-card__cta-text">View Project</span>
                        <div class="filter-card__cta-icon">
                            <component :is="icons.arrowRight" />
                        </div>
                    </div>
                </div>
            </div>
            <NuxtLink
                :to="card.url"
                class="filter-card__link"
            >
                <span class="sr-only">{{ card.title }}</span>
            </NuxtLink>
        </div>
        <div class="filter-card__media">
            <div class="filter-card__panels">
                <div
                    class="filter-card__panel"
                    v-for="(alpha, index) in panelGroup"
                    :key="`${alpha}--${index}`"
                    :style="`--card-panel-alpha: ${alpha};`"
                />
            </div>
            <SanityImage
                block="filter-card"
                :src="card.image"
                :callback="imageCallback"
                :amount-in-view="0.5"
            />
        </div>
    </article>
</template>