<script setup>
import { useFilterStore } from '~/stores/filters'
import { storeToRefs } from 'pinia'
import { unique } from 'radash'

const filters = useFilterStore()
const { selectedFilter, activeService, isService } = storeToRefs(filters)

const order = ref([ '', 'services', 'awarded'])

const serviceButton = ref()
const filterBar = ref()

const { height } = useElementSize(filterBar, 110, { box: 'border-box'})
const barHeight = useFilterBarHeight()
watch( height, (value) => barHeight.value = value)

watch(selectedFilter, (selected) => {
    const first = order.value[0]
    const active =  isService.value ? 'services' : selected

    order.value = unique([active, ...order.value.filter(item => item != selected && item != first), first])
    serviceButton.value[0].updateDynamicText( isService.value ? activeService.value.label : 'services' )
    serviceButton.value[0].updateDynamicPanels( isService.value ? activeService.value.panels : 4 )
    serviceButton.value[0].updateDynamicIcon( isService.value ? 'times' : 'caret-down')
    isService.value ? serviceButton.value[0].activate() : serviceButton.value[0].deactivate()
    filterBar.value.scrollTo(0, 0)
})

</script>

<template>
    <nav class="filter-bar" ref="filterBar">
        <TransitionGroup name="filter-group" tag="ul" class="filter-bar__list">
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