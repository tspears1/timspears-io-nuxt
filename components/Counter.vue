
<script setup>
import { ref, computed, onMounted } from "vue"
// notes on motion:
// each group starts staggered at say index + 500ms but duration reduced index - 500ms so all groups
// end at the same time.
// in each group, each NUMBER also starts staggered.

// on mount, build template, break up each character into <Digit>

// motion ends with a bounce or back ease

const props = defineProps({
    value: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        default: 1800, // in milliseconds
    },
    offset: {
        type: Number,
        default: 150 // in milliseconds
    },
    block: {
        type: String,
        default: "counter",
    },
})

const active = ref(false)

onMounted(() => {})

const characterSet = computed(() => {
    let parentArray = []
    Array.from(props.value).forEach((char) => {
        parentArray = [...parentArray, buildRotoList(char)]
    })
    return parentArray
})

const toggle = () => active.value = !active.value


const getArray = (char) => {
    const numberArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const alphaLowerArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const alphaUpperArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    const isNumber = (str) => /[0-9]/.test(str)
    const isUppercase = (str) => /[A-Z]/.test(str)
    const isLowercase = (str) => /[a-z]/.test(str)

    return isNumber(char)
        ? numberArray
        : isUppercase(char)
        ? alphaUpperArray
        : isLowercase(char)
        ? alphaLowerArray
        : char
}

const buildRotoList = (value, custom = null) => {
    const char = value.toString()
    let list = custom ?? getArray(char)
    if (Array.isArray(list)) {
        const index = list.indexOf(char)
        list = [...list, ...list.slice(0, index + 1)]
    }
    return list
}
</script>

<template>
    <div :class="[`${block}`, { '-active': active }]">
        <div
            v-for="(n, index) in characterSet"
            :key="n"
            :class="`${props.block}__number`"
            :style="`--counter-index: ${index}; --counter-offset: ${props.offset * index}ms; --counter-duration: ${props.duration}ms;`"
        >
            <div
                v-if="Array.isArray(n)"
                :class="`${props.block}__number__value nums_wrapper`"
            >
                <div>
                    <span :class="`${props.block}__current`">
                        {{ n.slice(-1)[0] }}
                    </span>
                    <span :class="`${props.block}__nums`" :style="`--nums-index: ${n.length - 1}`">
                        <span v-for="x in n" :key="x">
                            {{ x }}
                        </span>
                    </span>
                </div>
            </div>
            <div
                v-else
                :class="`${props.block}__number__value__num ${n === ' ' ? '-emptySpace' : ''}`"
            >
                <div>
                    {{ n }}
                </div>
            </div>
        </div>
    </div>
</template>
