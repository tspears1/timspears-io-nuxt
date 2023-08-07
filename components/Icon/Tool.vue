<script setup>
const props = defineProps({
    icon: String,
})

const { toolIconSet } = useIcons()

</script>

<template>
    <div class="tool-icon" :data-icon="icon">
        <div class="tool-icon__wrapper">
            <component :is="toolIconSet[icon]" />
        </div>
    </div>
</template>
