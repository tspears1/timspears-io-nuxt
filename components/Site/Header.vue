<script setup>
import { shuffle, list } from 'radash'
import { useGlobalData } from '@data/global'
const { data } = useGlobalData()

const { root } = useRoot()
const { columnCount } = useMenuGrid()

const loadGrid = ref(false)

const headerRef = ref()
const { height } = useElementSize(headerRef, 100, { box: 'border-box' })
const headerHeight = useHeaderHeight()
const headerHeightVar = useCssVar('--header-height', root, { initialValue: height.value })

const updateHeaderHeight = (height) => {
    headerHeight.value = height
    headerHeightVar.value = height + 'px'
}
const randomIndex = shuffle(list(1, columnCount.value))

watch( height, (val) => updateHeaderHeight(val))

onMounted(() =>{
    nextTick(() => {
        // solving a hydration issue with the grid.
        loadGrid.value = true
    })
})

</script>

<template>
    <header ref="headerRef" class="site-header">
        <div
            v-if="loadGrid"
            class="site-header__grid"
            :style="`--header-col-count: ${columnCount}`"
        >
            <div
                class="site-header__tile"
                v-for="n in columnCount"
                :key="n"
                :style="`--tile-delay-index: ${n == columnCount ? 0 : randomIndex[n - 1]}`"
            />
        </div>
        <IconLogo :title="data.siteTitle" />
        <div class="site-eyebrow">
            <div class="site-eyebrow__inner">
                <div class="site-eyebrow__closed">
                    {{ data.siteEyebrow }}
                </div>
                <div class="site-eyebrow__open">
                    {{  'Navigation' }}
                </div>
            </div>
        </div>
        <IconMenu />
    </header>
</template>