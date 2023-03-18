<script setup>

const props = defineProps({
    card: Object,
})

const imageRef = ref()

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
                        <div class="filter-card__cta-icon"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="filter-card__media">
            <img
                class="filter-card__img lazyload"
                ref="imageRef"
                :src="card.image"
            />
        </div>
    </article>
</template>