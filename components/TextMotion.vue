<script setup>
import { timeline, stagger, inView } from 'motion'
import { camel } from 'radash'

const props = defineProps({
    autoplay: {
        type: Boolean,
        required: false,
        default: true,
    },
    block: {
        type: String,
        required: false,
        default: 'text-motion'
    },
    duration: {
        type: [Number, Array],
        required: false,
        default: 0.125
    },
    easing: {
        type: [String, Array],
        required: false,
        default: 'ease-out-quint'
    },
    exit: {
        type: Boolean,
        required: false,
        default: false,
    },
    inview: {
        type: [Number, Array],
        required: false,
        default: 0.5,
    },
    stagger: {
        type: [Number, Array],
        required: false,
        default: 0.075
    },
    text: {
        type: String,
        required: true,
    },
    transitionType: {
        type: [String, Array],
        required: false,
        default: 'word'
    },
    transitionName: {
        type: [String, Array],
        required: false,
        default: 'slide-up'
    },
})

let hasEntered = false

const { entranceTransitions, exitTransitions } = useTransitions()

const blockRef = ref()
const textRef = ref()

const letters = computed(() => textRef.value.letterSpans)
const words = computed(() => textRef.value.wordWraps)

const enterSource = computed(() => propsArray(props.transitionType)[0] == 'word' ? words.value : letters.value)
const exitSource = computed(() => propsArray(props.transitionType)[1] == 'word' ? words.value : letters.value)

const enterEasing = computed(() => {
    const ease = propsArray(props.easing)[0]
    return ease == 'linear' ? 'linear' : cubicBezier[camel(ease)]
})

const exitEasing = computed(() => {
    const ease = propsArray(props.easing)[1]
    return ease == 'linear' ? 'linear' : cubicBezier[camel(ease)]
})

const enterDuration = computed(() => propsArray(props.duration)[0])
const exitDuration = computed(() => propsArray(props.duration)[1])

const enterStagger = computed(() => propsArray(props.stagger)[0])
const exitStagger = computed(() => propsArray(props.stagger)[1])

const enterTransition = computed(() => entranceTransitions[propsArray(props.transitionName)[0]] )
const exitTransition = computed(() => exitTransitions[propsArray(props.transitionName)[1]] )

const enterSequence = computed(() => [
    [
        enterSource.value,
        enterTransition.value,
        {
            delay: stagger(enterStagger.value),
            duration: enterDuration.value ,
            easing: enterEasing.value
        }
    ]
])

const exitSequence = computed(() => [
    [
        exitSource.value,
        exitTransition.value,
        {
            delay: stagger(exitStagger.value, { from: 'last' }),
            duration: exitDuration.value,
            easing: exitEasing.value
        }
    ]
])

const enter = () => timeline(enterSequence.value)
const exit = () => timeline(exitSequence.value)

onMounted(() => {
    const startMotion = timeline(enterSequence.value)
    startMotion.pause()

    props.autoplay && inView(blockRef.value,
        (info) => {
            !hasEntered ? startMotion.play() : enter()
            hasEntered = true

            return (exitInfo) => {
                props.exit && exit()
            }
        }, { amount: props.inview }
    )
})
</script>

<template>
    <div :class="`${block}`" ref="blockRef" :transition-type="props.transitionType" :transition-name="propsArray(props.transitionName)[0]">
        <div :class="`${block}__wrapper`">
            <TextSplitting
                ref="textRef"
                :block="block"
                :content="text"
                word-wrapper
            />
        </div>
    </div>
</template>