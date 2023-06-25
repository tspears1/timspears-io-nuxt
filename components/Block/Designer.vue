<script setup>

const props = defineProps({
    content: {
        type: Array,
        required: true,
    },
})

const componentsList = {
    awardsBlock: resolveComponent('BlockAwards'),
    galleryBlock: resolveComponent('BlockSlider'),
    mediaBlock: resolveComponent('BlockMedia'),
    projectIntro: resolveComponent('BlockProjectIntro'),
    textBlock: resolveComponent('BlockText'),
    textHeadingBlock: resolveComponent('BlockTextHeading'),
}

const activeComponents = computed(() => props.content.filter((component) => componentsList[component._type]) )

</script>

<template>
    <component
        v-for="(component, index) in activeComponents"
        :key="`${index}-${component._type}`"
        :is="componentsList[component._type]"
        :content="component"
    />
</template>