<script setup>
import { useFilterStore } from '~/stores/filters'
import { storeToRefs } from 'pinia'
import { spring } from 'motion'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap.mjs'

const filters = useFilterStore()
const { modalOpen, selectedFilter } = storeToRefs(filters)

const { serviceIcons } = useIcons()

const eyebrowRef = ref()
const modalRef   = ref()

const { activate, deactivate } = useFocusTrap(modalRef)

watch(modalOpen, (value) => {
    if ( value == true ) {
        setTimeout(() => {
            eyebrowRef.value.play()
            activate()
        }, 750);
    } else {
        deactivate()
        eyebrowRef.value.exit()
    }
})

watch(selectedFilter, (selected) => {
    const serviceActive = serviceIcons.filter(icon => icon.slug == selected)
    if ( serviceActive.length ) {
        setTimeout(() => {
            filters.closeModal()
        }, 100)
    }
})

</script>

<template>
    <div class="filter-modal" ref="modalRef" @keydown.esc="filters.closeModal">
        <Presence>
            <Motion
                v-if="modalOpen"
                class="filter-modal__screen"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :exit="{ opacity: 0 }"
                @click="filters.closeModal"
            />
        </Presence>
        <Presence>
            <Motion
                v-if="modalOpen"
                class="filter-modal__container"
                :initial="{ opacity: 0, y: 30 }"
                :animate="{
                    opacity: 1,
                    y: 0,
                    transition: { easing: spring(), delay: 0.25 },
                }"
                :exit="{
                    opacity: 0,
                    y: 30,
                    transition: { easing: spring(), delay: 0.65 },
                }"
            >
                <Eyebrow
                    class="-label"
                    text="Services"
                    block="filter-modal"
                    ref="eyebrowRef"
                    offset="0"
                />
                <ul class="filter-modal__options">
                    <Motion
                        class="filter-modal__item"
                        v-for="(icon, index) in serviceIcons"
                        :key="`icon-${icon.slug}`"
                        :initial="{ opacity: 0, x: 30 }"
                        :animate="{
                            opacity: 1,
                            x: 0,
                            transition: {
                                easing: cubicBezier.easeOutExpo,
                                duration: 1,
                                delay: 0.5 + 0.05 * (serviceIcons.length - index - 1)
                            }
                        }"
                        :exit="{
                            opacity: 0,
                            x: 30,
                            transition: {
                                easing: cubicBezier.easeOutExpo,
                                duration: 1,
                                delay: 0.05 * index
                            }
                        }"
                    >
                        <FilterIconRadio :icon="icon" :data-input-active="selectedFilter === icon.slug"/>
                    </Motion>
                </ul>
            </Motion>
        </Presence>
        <Presence>
            <Motion
                v-if="modalOpen"
                class="filter-modal__footer"
                :initial="{ opacity: 0, scale: 0 }"
                :animate="{ opacity: 1, scale: 1 }"
                :exit="{ opacity: 0, scale: 0 }"
                :transition="{ easing: cubicBezier.easeOutExpo, duration: 1.25,  delay: 1 }"
            >
                <Button
                    @click="filters.closeModal"
                    text="Close Services Modal"
                    theme="light"
                    icon="times"
                    :panel-count="1"
                    hidden-text
                    naked
                    tabindex="0"
                />
            </Motion>
        </Presence>
    </div>
</template>