<script setup>
import { random } from 'radash'
import { useGlobalData } from '@data/global'
const { data } = useGlobalData()

const { menuOpen } = useMenu()

const {
        tileArray,
        tileCount,
        tileSize,
        rowCount,
        columnCount,
        rowList,
        getListRow,
} = useMenuGrid()

const gridRef = ref()
const loadGrid = ref(false)
const activeItem = ref(0)

const splitRef = ref()

onMounted(() =>{
    nextTick(() => {
        // solving a hydration issue with the grid.
        loadGrid.value = true
    })
})

const TileGrid = (props, context) => {
    const tiles = tileArray.value.map((n, index) => {
        return h(
            'div',
            {
                class: 'site-menu__tile',
                key: `tile-${n}`,
                style: { '--tile-delay-index' : random(1, tileArray.value.length * 0.66) },
                'data-row': getListRow(index + 1) + 1,
            },
            [
                h('span', { class: 'site-menu__tile-front' }),
                h('span', { class: 'site-menu__tile-back' })
            ]
        )
    })
    return h(
        'div',
        {
            class: 'site-menu__grid',
            ref: gridRef,
        },
        tiles
    )
}

const updateActiveItem = (id) => activeItem.value = id

</script>

<template>
    <nav
        class="site-menu"
        :style="`
            --menu-tile-count: ${tileCount};
            --menu-tile-size: ${tileSize}px;
            --menu-row-count: ${rowCount};
            --menu-col-count: ${columnCount};
        `"
        :data-active-item="activeItem"
    >
        <TileGrid v-if="loadGrid" />
        <ul class="site-menu__list">
            <li
                v-for="(item, index) in data.navigation"
                :key="item.slug"
                class="site-menu__item"
            >
                <div class="site-menu__count">{{ `0${index + 1}.` }}</div>
                <NuxtLink
                    :to="`/${item.slug}`"
                    class="site-menu__link"
                    :data-title="item.title"
                    @mouseover="updateActiveItem(index + 1)"
                    @mouseleave="updateActiveItem(0)"
                >
                    <SiteMenuTitle :title="item.slug" :active="menuOpen"/>
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>