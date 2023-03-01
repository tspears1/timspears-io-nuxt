<script setup>
import { timeline, stagger } from 'motion'
import { pad } from '../utils/numbers'

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    frozen: {
        type: Boolean,
        required: false,
    },
    icon: {
        type: String,
        required: false,
    },
    digit: {
        type: [Number, String],
        required: false,
    },
    block: {
        type: String,
        required: false,
    },
    offset: {
        type: [Number, String],
        required: false,
        default: 0,
    },
})

const stem = ref()
const splitText = ref(null)

const parentClass = computed(() => props.block ? `${props.block}-eyebrow` : 'eyebrow')
const letters = computed(() => splitText.value.letters )

const generateClass = (phrase) => `${parentClass.value}__${phrase}`

const enterSequence = computed(() => {
    let sequence = []
    if ( !props.icon ) {
        sequence = [[stem.value, { scaleX: [ 0.001, 1] }, { duation: 0.5, easing: cubicBezier.easeOutQuint, at: props.offset }]]
    }
    sequence = [...sequence, [letters.value, { y: ['100%', 0] }, { delay: stagger(0.075), duration: 0.125, at: props.icon ? props.offset : '-0.5' } ]]
    return sequence
})

const play = () => timeline(enterSequence.value)

defineExpose({
    play,
    stem,
    splitText,
    enterSequence,
})


</script>

<template>
    <div :class="[parentClass, { '-is-splitting': !frozen }]">
        <div v-if="icon" :class="generateClass('icon')" />
        <div v-else :class="generateClass('stem')" ref="stem" />

        <div v-if="digit" :class="generateClass('digit')">
            {{ `${pad(digit)} /`  }}
        </div>

        <div v-if="frozen" :class="generateClass('text')">
            {{  text }}
        </div>
        <div v-else :class="generateClass('text')">
            <TextSplitting ref="splitText" :block="parentClass" :content="text" />
        </div>
    </div>
</template>