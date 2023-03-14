<script setup>
const props = defineProps({
    icon: String,
})

const { serviceIconSet } = useIcons()

</script>

<template>
    <div class="service-icon" :data-icon="icon">
        <div class="service-icon__wrapper">
            <component :is="serviceIconSet[icon]" />
        </div>
    </div>
</template>
