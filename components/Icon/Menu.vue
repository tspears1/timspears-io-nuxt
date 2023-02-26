<script setup>
import { animate, stagger } from 'motion'

const { menuOpen, toggleMenu } = useMenu()
const isHovering = ref(false)
const gridRef = reactive({
    dotsClosed: [],
    dotsOpened: [],
    barsClosed: [],
    barsOpened: [],
})

const isOpenedMotion = () => {
    isHovering.value = false
    animate(gridRef.dotsClosed, { opacity: 0 }, { duration: 0.75, delay: stagger(0.1, { from: 'center' })})
}

const isClosedMotion = () => {
    isHovering.value = false
    animate(gridRef.dotsClosed, { opacity: 1 }, { duration: 0.75, delay: stagger(0.1, { from: 'center' })})
}

const isHoveredOpenedMotion = () => {
    animate(gridRef.barsOpened, { scaleX: [0.0001, 1], scaleY: [0.0001, 1], opacity: 0.5 }, { delay: stagger(0.15), duration: .5 })
}

const isHoveredClosedMotion = () => {
    animate(gridRef.barsClosed, { scaleX: [0.0001, 1], opacity: 0.5 }, { delay: stagger(0.075), duration: .25 })
}

const isNotHovering = () => {
    animate([...gridRef.barsClosed, ...gridRef.barsOpened], { opacity: 0 })
}

onMounted(() => {
    gridRef.dotsClosed = document.querySelectorAll('.site-menu__trigger-dot--closed')
    gridRef.dotsOpened = document.querySelectorAll('.site-menu__trigger-dot--opened')
    gridRef.barsClosed = document.querySelectorAll('.site-menu__trigger-bar--closed')
    gridRef.barsOpened = document.querySelectorAll('.site-menu__trigger-bar--opened')
})

const onClick = () => {
    toggleMenu()
    menuOpen.value ? isOpenedMotion() : isClosedMotion()
}

watch(isHovering, (value) => {
    if (!value) {
        isNotHovering()
    } else {
        menuOpen.value ? isHoveredOpenedMotion() : isHoveredClosedMotion()
    }
})

</script>

<template>
    <button
        :class="[`site-menu__trigger`, { '-is-open': menuOpen }]"
        @click="onClick"
        @mouseover="isHovering = true"
        @mouseleave="isHovering = false"
    >
        <span class="sr-only">{{ menuOpen ? 'Close Menu' : 'Open Menu' }}</span>
        <svg class="site-menu__trigger-grid" width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--closed" cx="3" cy="10" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--closed" cx="11" cy="2" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--closed" cx="11" cy="26" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--closed" cx="3" cy="18" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--closed" cx="27" cy="10" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--closed" cx="19" cy="2" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--closed" cx="19" cy="26" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--closed" cx="27" cy="18" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--opened" cx="11" cy="10" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--opened" cx="3" cy="2" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--opened" cx="3" cy="26" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--opened" cx="11" cy="18" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--opened" cx="19" cy="10" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--opened" cx="27" cy="2" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--opened" cx="27" cy="26" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="site-menu__trigger-dot site-menu__trigger-dot--opened" cx="19" cy="18" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <line class="site-menu__trigger-bar site-menu__trigger-bar--closed" x1="3" y1="2" x2="27" y2="2" stroke="var(--menu-icon-closed-bars-color, #0C4F75)" stroke-width="4" stroke-linecap="round"/>
            <line class="site-menu__trigger-bar site-menu__trigger-bar--closed -origin-right" x1="3" y1="10" x2="27" y2="10" stroke="var(--menu-icon-closed-bars-color, #0C4F75)" stroke-width="4" stroke-linecap="round"/>
            <line class="site-menu__trigger-bar site-menu__trigger-bar--closed" x1="3" y1="18" x2="27" y2="18" stroke="var(--menu-icon-closed-bars-color, #0C4F75)" stroke-width="4" stroke-linecap="round"/>
            <line class="site-menu__trigger-bar site-menu__trigger-bar--closed -origin-right" x1="3" y1="26" x2="27" y2="26" stroke="var(--menu-icon-closed-bars-color, #0C4F75)" stroke-width="4" stroke-linecap="round"/>
            <line class="site-menu__trigger-bar site-menu__trigger-bar--opened" x1="2.82843" y1="2" x2="27" y2="26.1716" stroke="var(--menu-icon-opened-bars-color, #0C4F75)" stroke-width="4" stroke-linecap="round"/>
            <line class="site-menu__trigger-bar site-menu__trigger-bar--opened -origin-top-right" x1="3" y1="26.1716" x2="27.1716" y2="2" stroke="var(--menu-icon-opened-bars-color, #0C4F75)" stroke-width="4" stroke-linecap="round"/>
        </svg>
    </button>
</template>