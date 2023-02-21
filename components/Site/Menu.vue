<script setup>
import { random } from 'radash'
import { useGlobalData } from '@data/global'
const { data } = useGlobalData()

const { menuOpen } = useMenu()

const { width: windowWidth, height: windowHeight } = useWindowSize()
const { getFrameBorder } = useFrame()
const headerHeight = useHeaderHeight()

const gridRef = ref()
const loadGrid = ref(false)

const menuWidth   = computed(() => windowWidth.value - getFrameBorder(2))
const menuHeight  = computed(() => windowHeight.value - headerHeight.value - getFrameBorder(2))
const rowCount    = computed(() => data.value.navigation.length * 2)
const tileSize    = computed(() => menuHeight.value / rowCount.value)
const columnCount = computed(() => Math.ceil( menuWidth.value / tileSize.value ))
const tileCount   = computed(() => columnCount.value * rowCount.value)
const tileArray   = computed(() => Array.from({ length: tileCount.value }))

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