<script setup>
import { shuffle, list } from 'radash'
import { useGlobalData } from '@/data/global'
import { timeline, stagger } from 'motion'

const { data } = useGlobalData()

const { root } = useRoot()
const { menuOpen } = useMenu()
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

const eyebrowClosedRef = ref()
const eyebrowOpenedRef = ref()
const eyebrowClosedLetters = computed(() => eyebrowClosedRef.value.letters)
const eyebrowOpenedLetters = computed(() => eyebrowOpenedRef.value.letters)

const enterSequence = computed(() => [
    [eyebrowClosedLetters.value, { y: [0, '-100%'] }, { delay: stagger(0.1, { from: 'center' }), at: 0 }],
    [eyebrowOpenedLetters.value, { y: ['100%', 0] }, { delay: stagger(0.1, { from: 'center' }), at: 0 }],
])

const exitSequence = computed(() => [
    [eyebrowClosedLetters.value, { y: ['-100%', 0] }, { delay: stagger(0.1, { from: 'center' }), at: 0 }],
    [eyebrowOpenedLetters.value, { y: [0, '100%'] }, { delay: stagger(0.1, { from: 'center' }), at: 0 }],
])

const resetEyebrow = () => {
    timeline(exitSequence.value, { duration: 0 })
}

watch(menuOpen, (value) => {
    if (value == true) {
        timeline(enterSequence.value, { duration: 1 })
    } else {
        timeline(exitSequence.value, { duration: 1 })
    }
})

defineExpose({
    resetEyebrow
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
                    <TextSplitting ref="eyebrowClosedRef" block="site-eyebrow" :content="data.siteEyebrow" />
                </div>
                <div class="site-eyebrow__open">
                    <TextSplitting ref="eyebrowOpenedRef" block="site-eyebrow" content="Navigation" />
                </div>
            </div>
        </div>
        <IconMenu />
    </header>
</template>