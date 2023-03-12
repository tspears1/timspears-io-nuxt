<script setup>
import { camel, list } from 'radash'
import { useFilterStore } from '~/stores/filters'
import { storeToRefs } from 'pinia'

const filters = useFilterStore()
const { selectedFilter } = storeToRefs(filters)

const { icons } = useButton()

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    naked: {
        type: Boolean,
        default: false,
    },
    hiddenText: {
        type: Boolean,
        default: false,
    },
    swapOrder: {
        type: Boolean,
        default: false,
    },
    panelCount: {
        type: Number,
        default: 5,
    },
    icon: {
        type: String,
        validator(value) {
            return ['arrow-right', 'arrow-left', 'grommet', 'caret-down', 'caret-up', 'times'].includes(value)
        }
    },
    size: {
        type: String,
        validator(value) {
            return ['compressed', 'normal', 'giant' ].includes(value)
        }
    },
    theme: {
        type: String,
        default: 'dark',
        validator(value) {
            return ['dark', 'light'].includes(value)
        }
    },
    name: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        default: '',
    }
})

const buttonRef = ref()

</script>

<template>
    <div
        :class="['button filter-radio', { 'button--swap' : swapOrder, 'button--naked': naked }]"
        :style="`--button-panel-count: ${panelCount};`"
        :data-theme="theme"
        :data-size="size"
        :data-active="selectedFilter == value"
        :data-panels="panelCount"
        ref="buttonRef"
    >
        <div class="button__panels" v-if="panelCount">
            <span
                class="button__panel"
                v-for="n in list(1, panelCount)"
                :key="`button__panel-${n}`"
                :style="`--button-panel-index: ${n};`"
            />
        </div>
        <label
            :class="['button__text filter-radio__label', {'sr-only': hiddenText }]"
        >
            <input
                type="radio"
                class="filter-radio__input"
                :name="name"
                :value="value"
                v-model="selectedFilter"
            >
            <span>
                {{ text }}
            </span>
        </label>
        <div
            v-if="icon"
            class="button__icon"
        >
            <component :is="icons[camel(icon)]" />
        </div>
    </div>
</template>