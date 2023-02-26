<script setup>
import { random } from 'radash'
import { useGlobalData } from '@/data/global'
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
    transitionTime
} = useMenuGrid()

const gridRef = ref()
const countRef = ref()
const loadGrid = ref(false)
const activeItem = ref(0)
const isAnimating = ref(false)

const lastCounter = computed(() => countRef.value[data.value.navigation.length - 1])

onMounted(() =>{
    nextTick(() => {
        // solving a hydration issue with the grid.
        loadGrid.value = true

        lastCounter.value.addEventListener('transitionend', () => {
            if (menuOpen.value == true) { isAnimating.value = false }
        })

    })
})

watch(menuOpen, (value) => value == true ? isAnimating.value = true : isAnimating.value = false )

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
            () => [
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
        :class="['site-menu', { '-is-animating' : isAnimating }]"
        :style="`
            --menu-tile-count: ${tileCount};
            --menu-tile-size: ${tileSize}px;
            --menu-row-count: ${rowCount};
            --menu-col-count: ${columnCount};
            --menu-enter-time: ${transitionTime};
        `"
        :data-active-item="activeItem"
    >
        <TileGrid v-if="loadGrid" />
        <ul class="site-menu__list">
            <li
                v-for="(item, index) in data.navigation"
                :key="item.slug"
                class="site-menu__item"
                :style="`--menu-item-index: ${index};`"
            >
                <div class="site-menu__count" ref="countRef">
                    <span>{{ `0${index + 1}.` }}</span>
                </div>
                <NuxtLink
                    :to="`/${item.slug}`"
                    class="site-menu__link"
                    :data-title="item.title"
                    :tabindex="menuOpen ? 0 : -1"
                    @mouseover="updateActiveItem(index + 1)"
                    @mouseleave="updateActiveItem(0)"
                >
                    <SiteMenuTitle :title="item.slug" />
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>