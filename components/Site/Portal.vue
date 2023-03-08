<script setup>
import { random, shuffle } from 'radash'
import { animate, stagger } from 'motion'
import { usePortalStore } from '@/stores/portal'
import { storeToRefs } from 'pinia';

const { menuOpen } = useMenu()

const {
    tileCount,
    tileDelay,
    tileSize,
    rowCount,
    columnCount,
    rowList,
    getListRow,
    transitionTime
} = useMenuGrid()

const portalRef = ref()
const portalGridRef = ref()
const loadGrid = ref(false)
const tilePortalCount = computed(() => tileCount.value + columnCount.value)
const tilePortalArray = computed(() => Array.from({ length: tilePortalCount.value }))

const portalStore = usePortalStore()
const { portalTiles } = storeToRefs(portalStore)
const tilesRef = ref()

const portalOpen = (done) => {
    const target = shuffle(tilesRef.value)
    animate(target, { opacity: [ 0, 1 ], scale: [0.6, 1] }, { delay: stagger(0.005) }).finished.then(() => done)
}

const portalSwap = (done) => {
    const target = shuffle(tilesRef.value)
    animate(target, { background: [null, 'var(--tile-color-secondary)']}, { delay: stagger(0.005), duration: 2 }).finished.then(() => done)
}

const portalClose = (done) => {
    const target = shuffle(tilesRef.value)
    animate(target, { opacity: [ 1, 0 ], scale: [ 1, 0.6 ] }, { delay: stagger(0.005) }).finished.then(() => done)
}

//watch(portalActive, (value) => !!value ? portalOpen() : portalClose() )

onMounted(() =>{
    nextTick(() => {
        // solving a hydration issue with the grid.
        loadGrid.value = true

        portalTiles.value = tilesRef.value
    })
})

const TileGrid = (props, context) => {
    const tiles = tilePortalArray.value.map((n, index) => {
        return h(
            'div',
            {
                class: 'site-portal__tile',
                key: `tile-${n}`,
                ref: tilesRef,
                ref_for: true,
                style: {
                    '--tile-delay-index' : random(1, tilePortalArray.value.length * 0.66),
                    '--tile-color-primary' : `var(--c-theme-${pad(random(1, 6), '00')})`,
                    '--tile-color-secondary' : `var(--c-theme-${pad(random(1, 6), '00')})`
                },
                'data-row': getListRow(index + 1) + 1,
            },
            () => [
                h('span', { class: 'site-portal__tile-front' }),
                h('span', { class: 'site-portal__tile-back' })
            ]
        )
    })
    return h(
        'div',
        {
            class: 'site-portal__grid',
            ref: portalGridRef,
        },
        tiles
    )
}

</script>

<template>
    <div
        class="site-portal"
        ref="portalRef"
        :style="`
            --portal-tile-count: ${tilePortalCount};
            --portal-tile-size: ${tileSize}px;
            --portal-row-count: ${rowCount};
            --portal-col-count: ${columnCount};
            --portal-enter-time: ${transitionTime};
        `"
    >
        <TileGrid v-if="loadGrid"/>
    </div>
</template>