<script setup>

import { camel, list } from 'radash'

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
    active: {
        type: Boolean,
        default: false,
    }
})

const buttonRef = ref()
const buttonActive = ref(null)
const dynamicText = ref()
const dynamicPanels = ref()
const dynamicIcon = ref()

const isActive = computed(() => buttonActive.value ?? props.active)
const panels = computed(() => dynamicPanels.value ?? props.panelCount )
const hasIcon = computed(() => dynamicIcon.value ?? props.icon )

const updateDynamicText = (value) => dynamicText.value = value
const updateDynamicPanels = (value) => dynamicPanels.value = value
const updateDynamicIcon = (value) => dynamicIcon.value = value
const setActive = (value) => buttonActive.value = value
const activate = () => buttonActive.value = true
const deactivate = () => buttonActive.value = false

// allow active hover? add dynamic icon lol

defineExpose({
    updateDynamicText,
    updateDynamicPanels,
    updateDynamicIcon,
    setActive,
    activate,
    deactivate,
})

</script>

<template>
    <button
        :class="['button', { 'button--swap' : swapOrder, 'button--naked': naked }]"
        :style="`--button-panel-count: ${panels};`"
        :data-theme="theme"
        :data-size="size"
        :data-active="isActive"
        :data-panels="panels"
        ref="buttonRef"
    >
        <div class="button__panels" v-if="panels">
            <span
                class="button__panel"
                v-for="n in list(1, panels)"
                :key="`button__panel-${n}`"
                :style="`--button-panel-index: ${n};`"
            />
        </div>
        <div
            :class="['button__text', {'sr-only': hiddenText }]"
        >
            {{ dynamicText ?? text }}
        </div>
        <div
            v-if="hasIcon"
            class="button__icon"
        >
            <div class="button__icon-wrapper">
                <component :is="icons[camel(hasIcon)]" />
            </div>
        </div>
    </button>
</template>