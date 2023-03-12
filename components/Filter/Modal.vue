<script setup>
import { useFilterStore } from '~/stores/filters'
import { storeToRefs } from 'pinia'

const filters = useFilterStore()
const { modalOpen } = storeToRefs(filters)

const eyebrowRef = ref()

</script>

<template>
    <div class="filter-modal">
        <Presence>
            <Motion
                v-show="modalOpen"
                class="filter-modal__screen"
            />
        </Presence>
        <Presence>
            <Motion
                v-show="modalOpen"
                class="filter-modal__container"
            >
                <Eyebrow
                    text="Services"
                    block="filter-modal"
                    ref="eyebrowRef"
                    offset="0"
                />
                <ul class="filter-modal__options">
                    <li class="filter-modal__item">

                    </li>
                </ul>
            </Motion>
        </Presence>
        <Presence>
            <Motion
                v-show="modalOpen"
                class="filter-modal__footer"
            >
                <Button
                    text="Close Services Modal"
                    theme="light"
                    icon="times"
                    :panel-count="1"
                    hidden-text
                />
            </Motion>
        </Presence>
    </div>
</template>