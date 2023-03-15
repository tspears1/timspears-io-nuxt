<script setup>
import { useFilterStore } from '~/stores/filters'
import { storeToRefs } from 'pinia'
import { spring } from 'motion'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap.mjs'

const filters = useFilterStore()
const { modalOpen } = storeToRefs(filters)

const { serviceIcons } = useIcons()

const eyebrowRef = ref()
const modalRef   = ref()

const { activate, deactivate } = useFocusTrap(modalRef)

const onKeyDown = () => {

}

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

</script>

<template>
    <div class="filter-modal" ref="modalRef">
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
                :initial="{ opacity: 0, y: 60 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: 60 }"
                :transition="{ easing: spring(), delay: 0.25 }"
            >
                <Eyebrow
                    class="-label"
                    text="Services"
                    block="filter-modal"
                    ref="eyebrowRef"
                    offset="0"
                />
                <ul class="filter-modal__options">
                    <li
                        class="filter-modal__item"
                        v-for="icon in serviceIcons"
                        :key="`icon-${icon}`"
                    >
                        <FilterIconRadio :icon="icon" />
                    </li>
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
                :transition="{ easing: spring({ damping: 5 }), delay: 0.5 }"
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