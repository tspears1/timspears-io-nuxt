<script setup>
import { useFilterStore } from '~/stores/filters'
import { storeToRefs } from 'pinia'

const filters = useFilterStore()
const { selectedFilter } = storeToRefs(filters)

const props = defineProps({
    icon: Object,
    name: String,
})

</script>

<template>
    <div class="filter-icon-radio">
        <label class="filter-icon-radio__label" />
        <IconService :icon="icon.slug" />
        <input
            type="radio"
            class="filter-icon-radio__input"
            :name="name"
            :value="icon.slug"
            v-model="selectedFilter"
        >
    </div>
</template>