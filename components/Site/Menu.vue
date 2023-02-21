<script setup>
import { random } from 'radash'
import { useGlobalData } from '@data/global'
const { data } = useGlobalData()

const { menuOpen } = useMenu()

const { tileArray, tileCount, tileSize, rowCount, columnCount } = useMenuGrid()

const gridRef = ref()
const loadGrid = ref(false)

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
                style: { '--tile-delay-index' : random(1, tileArray.value.length * 0.66) }
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
    >
        <TileGrid v-if="loadGrid" />
        <ul class="site-menu__list">
            <li
                v-for="(item, index) in data.navigation"
                :key="item.slug"
                class="site-menu__item"
            >
                <div class="site-menu__count">{{ `0${index + 1}.` }}</div>
                <NuxtLink :to="`/${item.slug}`" class="site-menu__link">
                    {{  item.title }}
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>