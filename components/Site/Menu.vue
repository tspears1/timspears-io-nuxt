<script setup>
import { random } from 'radash'
import { useGlobalData } from '@/data/global'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap.mjs'

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
const navRef = ref()
const loadGrid = ref(false)
const activeItem = ref(0)
const activeEvent = ref(null)
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

const focusRef = computed(() => [document.querySelector('.site-menu__trigger'), navRef.value])
const { activate, deactivate } = useFocusTrap(focusRef)

watch(menuOpen, (value) => {
    if (value == true) {
        isAnimating.value = true
        nextTick(() => {
            activate()
        })
    } else {
        isAnimating.value = false
        deactivate()
    }
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

const updateActiveItem = (id, event) => {
    activeItem.value = id
    activeEvent.value = event
}

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
        :data-active-event="activeEvent"
        v-cloak
        ref="navRef"
    >
        <TileGrid v-if="loadGrid" />
        <ul class="site-menu__list">
            <li
                v-for="(item, index) in data.navigation"
                :key="item.slug"
                class="site-menu__item"
                :class="{ '-is-active' : activeItem == index + 1 }"
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
                    @mouseover="updateActiveItem(index + 1, 'hover')"
                    @mouseleave="updateActiveItem(0)"
                    @focus="updateActiveItem(index + 1, 'focus')"
                    @blur="updateActiveItem(0)"
                >
                    <SiteMenuTitle :title="item.slug" />
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>