<script setup>
import { useFilterStore } from '~/stores/filters'
import { storeToRefs } from 'pinia'
import { unique } from 'radash'

const filters = useFilterStore()
const { selectedFilter } = storeToRefs(filters)

const { serviceIcons } = useIcons()

const order = ref([ '', 'services', 'awarded'])

const serviceButton = ref()

watch(selectedFilter, (selected) => {
    const first = order.value[0]
    const serviceActive = serviceIcons.filter(icon => icon.slug == selected)
    const active = serviceActive.length ? 'services' : selected

    order.value = unique([active, ...order.value.filter(item => item != selected && item != first), first])
    //console.log('order: ', order.value, selected)
    serviceButton.value[0].updateDynamicText( serviceActive.length ? serviceActive[0].label : 'services' )
    serviceButton.value[0].updateDynamicPanels( serviceActive.length ? serviceActive[0].panels : 4 )
    serviceButton.value[0].updateDynamicIcon( serviceActive.length ? 'times' : 'caret-down')
    serviceActive.length ? serviceButton.value[0].activate() : serviceButton.value[0].deactivate()
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