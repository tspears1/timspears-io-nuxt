<script setup>
import { isString, isArray } from 'radash'

const isSplit = ref(true)

const props = defineProps({
    content: {
        type: String,
        required: true,
    },
    placeholder: {
        type: Boolean,
        default: true,
        required: false,
    },
    block: {
        type: String,
        default: 'splitting',
        required: false,
    },
    letterBreak: {
        type: Boolean,
        default: true,
        required: false,
    },
    letterWrapper: {
        type: Boolean,
        default: true,
        required: false,
    },
    seperator: {
        type: String,
        default: '__',
        required: false,
    },
    tag: {
        type: String,
        default: 'div',
        required: false,
    }
})

const splitContent = computed(() => props.content.split(' ').map((group) => group.split('')))

const generateClass = (phrase) => props.block + props.seperator + phrase

const renderBlock = (block, index) => {
    if (isArray(block)) {
        return h(
            props.tag,
            {
                class: generateClass('word'),
                style: `--letter-count: ${block.length}; --word-index: ${index};`
            },
            props.letterBreak
                ? block.map((letter, index) => renderBlock(letter, index))
                : block.join('')
        )
    }

    if (isString(block)) {
        return h(
            props.tag,
            {
                class: generateClass('letter') ,
                style: `--letter-index: ${index};`
            },
            props.letterWrapper ? h('span', block) : block
        )
    }
}

const SplitRender = () => h(
    props.tag,
    {
        class: generateClass('splitting'),
        style: `--word-count: ${splitContent.value.length};`
    },
    splitContent.value.map((word, index) => renderBlock(word, index))
)

const split = () => isSplit.value = true
const revert = () => isSplit.value = false

defineExpose({
    props,
    SplitRender,
    split,
    revert,
})
</script>

<template>
    <div v-if="isSplit && placeholder" :class="generateClass('placeholder')">{{ content }}</div>
    <SplitRender v-if="isSplit" />
    <component v-else :is="tag" :class="generateClass('splitting')">{{ content }}</component>
</template>
