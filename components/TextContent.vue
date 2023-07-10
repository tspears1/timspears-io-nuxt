<script setup>
const props = defineProps({
    blocks: {
        type: [Object, Array],
        required: true,
    }
})

const serializers = {
    marks: {
        code: 'code',
        underline: 'u',
        'strike-through': 's',
    },
}

</script>
<template>
    <SanityContent v-if="blocks" :blocks="blocks" :serializers="serializers"  />
</template>