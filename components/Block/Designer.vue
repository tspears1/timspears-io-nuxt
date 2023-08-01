<script setup>

const props = defineProps({
    content: {
        type: Array,
        required: false,
        default: () => [],
    },
})

const componentsList = {
    awardsBlock: resolveComponent('BlockAwards'),
    featuredBlock: resolveComponent('BlockFeatured'),
    galleryBlock: resolveComponent('BlockSlider'),
    mediaBlock: resolveComponent('BlockMedia'),
    projectIntro: resolveComponent('BlockProjectIntro'),
    servicesBlock: resolveComponent('BlockServices'),
    textBlock: resolveComponent('BlockText'),
    textHeadingBlock: resolveComponent('BlockTextHeading'),
}

const activeComponents = computed(() => props?.content?.filter((component) => componentsList[component._type]) )

</script>

<template>
    <component
        v-for="(component, index) in activeComponents"
        :key="`${index}-${component._type}`"
        :is="componentsList[component._type]"
        :content="component"
    />
</template>