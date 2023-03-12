<script setup>
import arrowRight from '@/assets/svgs/button/arrow-right.svg'
import caretDown from '@/assets/svgs/button/caret-down.svg'

import { camel, list } from 'radash'

const icons = { arrowRight, caretDown }

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
    style: {
        type: String,
        default: 'dark',
        validator(value) {
            return ['dark', 'light'].includes(value)
        }
    }
})

const buttonRef = ref()

const { height, width } = useElementSize(buttonRef)

const panelCount = computed(() => list( Math.ceil( width.value / height.value ) - 1 ))

</script>

<template>
    <button
        :class="['button', { 'button--swap' : swapOrder, 'button--naked': naked }]"
        :style="`--button-panel-count: ${panelCount.length};`"
        :data-theme="style"
        :data-size="size"
        ref="buttonRef"
    >
        <div class="button__panels" v-if="panelCount">
            <span
                class="button__panel"
                v-for="n in panelCount"
                :key="`button__panel-${n}`"
                :style="`--button-panel-index: ${n + 1};`"
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