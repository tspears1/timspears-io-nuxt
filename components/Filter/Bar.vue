<script setup>
import { useFilterStore } from '~/stores/filters'
import { storeToRefs } from 'pinia'

const filters = useFilterStore()
const { selectedFilter } = storeToRefs(filters)

const { serviceIcons } = useIcons()

const order = ref([ '', 'services', 'awarded'])

const serviceButton = ref()

watch(selectedFilter, (selected) => {
    const first = order.value[0]
    const serviceActive = serviceIcons.filter(icon => icon.slug == selected)
    const active = serviceActive.length ? 'services' : selected
    // need to remove filter if it already exists or check before updating.
    order.value = [selected, ...order.value.filter(item => item != selected && item != first), first]
    serviceButton.value[0].updateDynamicText(serviceActive.length ? serviceActive[0].label : 'services')
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
                />
                <Button
                    v-if="option == 'services'"
                    text="Services"
                    size="compressed"
                    icon="caret-down"
                    theme="light"
                    :panel-count="4"
                    ref="serviceButton"
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