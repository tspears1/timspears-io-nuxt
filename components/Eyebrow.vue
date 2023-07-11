<script setup>
import { timeline, stagger, inView } from 'motion'
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
    autoplay: {
        type: Boolean,
        required: false,
        default: true,
    },
})

const eyebrowRef = ref()
const stem = ref()
const iconRef = ref()
const splitText = ref(null)

const parentClass = computed(() => props.block ? `${props.block}-eyebrow` : 'eyebrow')
const fullText = computed(() => props.digit ? `${pad(props.digit)} / ${props.text}` : props.text)
const letters = computed(() => splitText.value.letters )

const generateClass = (phrase) => `${parentClass.value}__${phrase}`

const enterSequence = computed(() => {
    let sequence = []
    if ( !props.icon ) {
        sequence = [[ stem.value, { scaleX: [ 0.001, 1] }, { duation: 0.5, easing: cubicBezier.easeOutQuint, at: props.offset }]]
    } else {
        sequence = [[ iconRef.value, { y: ['calc(100% + 0.25em)', 0] }, { duration: 0.25, at: props.offset } ]]
    }
    sequence = [...sequence, [letters.value, { y: ['calc(100% + 0.25em)', 0] }, { delay: stagger(0.075), duration: 0.125, at: props.icon ? props.offset : '-0.5' } ]]
    return sequence
})

const exitSequence = computed(() => {
    let sequence = []
    sequence = [...sequence, [letters.value, { y: [0, 'calc(100% + 0.25em)'] }, { delay: stagger(0.075, { from: 'last' }), duration: 0.125, at: props.offset } ]]
    if ( !props.icon ) {
        sequence = [...sequence, [stem.value, { scaleX: [ 1, 0.001] }, { duation: 0.25, easing: cubicBezier.easeOutQuint, at: props.icon ? props.offset : '-0.5' }]]
    } else {
        sequence = [...sequence, [iconRef.value, { y: [0, 'calc(100% + 0.25em)'] }, { duration: 0.25, at: props.offset } ]]
    }
    return sequence
})

const play = () => timeline(enterSequence.value)

const exit = () => timeline(exitSequence.value)

onMounted(() => {
    props.autoplay && inView(eyebrowRef.value, () => play(), { amount: 0.4 })
})

defineExpose({
    play,
    exit,
    stem,
    splitText,
    enterSequence,
})


</script>

<template>
    <div :class="[parentClass, { '-is-splitting': !frozen }]" ref="eyebrowRef">
        <div v-if="icon" :class="generateClass('icon')">
            <div :class="generateClass('icon-wrapper')" ref="iconRef">
                <IconService :icon="icon" />
            </div>
        </div>

        <div v-else :class="generateClass('stem')" ref="stem" />

        <div v-if="frozen" :class="generateClass('text')">
            {{ fullText }}
        </div>
        <div v-else :class="generateClass('text')">
            <TextSplitting ref="splitText" :block="parentClass" :content="fullText" />
        </div>
    </div>
</template>