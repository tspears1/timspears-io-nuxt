<script setup>
import { useFilterStore } from '~/stores/filters'
import { storeToRefs } from 'pinia'

const filters = useFilterStore()
const { selectedFilter } = storeToRefs(filters)

const order = ref([ '', 'services', 'awarded'])

watch(selectedFilter, (selected) => {
    const first = order.value[0]
    order.value = [selected, ...order.value.filter(item => item != selected && item != first), first]
})


</script>

<template>
    <nav class="filter-bar">
        <TransitionGroup name="filter-group">
            <li
                class="filter-bar__item"
                v-for="option in order"
                :key="`option-${option}`"
            >
                <FilterRadio
                    v-if="option == ''"
                    name="workFilters"
                    value=""
                    text="All"
                    size="compressed"
                    icon="grommet"
                    theme="light"
                    :panel-count="3"
                    naked
                />
                <Button
                    v-if="option == 'services'"
                    text="Services"
                    size="compressed"
                    icon="caret-down"
                    theme="light"
                    :panel-count="4"
                    @click="filters.openModal"
                />
                <FilterRadio
                    v-if="option == 'awarded'"
                    name="workFilters"
                    value="awarded"
                    text="Awarded"
                    size="compressed"
                    icon="grommet"
                    theme="light"
                    :panel-count="4"
                />
            </li>
        </TransitionGroup>
    </nav>
</template>