<template>
    <header ref="headerRef" class="site-header">
        <IconLogo :title="data.siteTitle" />
        <div class="site-eyebrow">
            {{  data.siteEyebrow }}
        </div>
        <IconMenu />
    </header>
</template>

<script setup>
import { useGlobalData } from '@data/global'
const { data } = useGlobalData()

const { root } = useRoot()

const headerRef = ref()
const { height } = useElementSize(headerRef, 100, { box: 'border-box' })
const headerHeight = useHeaderHeight()
const headerHeightVar = useCssVar('--header-height', root, { initialValue: height.value })

const updateHeaderHeight = (height) => {
    headerHeight.value = height
    headerHeightVar.value = height + 'px'
}

watch( height, (val) => updateHeaderHeight(val))

</script>