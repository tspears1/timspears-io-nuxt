<script setup>
import { useGlobalData } from '@data/global'
const { data } = useGlobalData()

const { width: windowWidth, height: windowHeight } = useWindowSize()
const { getFrameBorder } = useFrame()
const headerHeight = useHeaderHeight()

const menuWidth   = computed(() => windowWidth.value - getFrameBorder(2))
const menuHeight  = computed(() => windowHeight.value - headerHeight.value - getFrameBorder(2))
const rowCount    = computed(() => data.value.navigation.length)
const tileSize    = computed(() => menuHeight.value / rowCount.value)
const columnCount = computed(() => Math.ceil( menuWidth.value / tileSize.value ))
const tileCount   = computed(() => columnCount.value * rowCount.value || 0)
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
        <div class="site-menu__grid">
            <div
                v-for="n in tileCount"
                :key="`tile-${n}`"
                class="site-menu__tile"
            />
        </div>
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