<script setup>
import arrowRight from '@/assets/svgs/button/arrow-right.svg'
import caretDown from '@/assets/svgs/button/caret-down.svg'
import grommet from '@/assets/svgs/button/grommet.svg'

import { camel, list } from 'radash'

const icons = { arrowRight, caretDown, grommet }

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
    active: {
        type: Boolean,
        default: false,
    }
})

const buttonRef = ref()

</script>

<template>
    <button
        :class="['button', { 'button--swap' : swapOrder, 'button--naked': naked }]"
        :style="`--button-panel-count: ${panelCount};`"
        :data-theme="theme"
        :data-size="size"
        :data-active="active"
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
        <div
            :class="['button__text', {'sr-only': hiddenText }]"
        >
            {{ text }}
        </div>
        <div
            v-if="icon"
            class="button__icon"
        >
            <component :is="icons[camel(icon)]" />
        </div>
    </button>
</template>