<script setup>
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'

import { list } from 'radash'

const slideList = ref(list(1, 10))

const sliderRef = ref()
const navigationRef = ref()
const grabbing = ref(false)

const sliderOptions = {
    arrows: false,
    gap: 'var(--slider-slide-gap)',
    flickPower: 300,
    flickMaxPages: 1,
    pagination: false,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    updateOnMove: true,
}

const navigationOptions = {
    arrows: false,
    gap: 'var(--slider-nav-gap)',
    flickPower: 300,
    flickMaxPages: 1,
    pagination: false,
    isNavigation: true,
    updateOnMove: true,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
}

const navSplide = computed(() => navigationRef.value.splide)

onMounted(() => {
    const navSplide = navigationRef.value?.splide
    navSplide && sliderRef.value?.sync( navSplide )
})

const toPrevSlide = () => {
    navSplide.value.go(navSplide.value.index - 1)
}

const toNextSlide = () => {
    navSplide.value.go(navSplide.value.index + 1)
}

const startGrabbing = () => grabbing.value = true

const stopGrabbing = () => grabbing.value = false

</script>

<template>
    <section
        class="slider-block"
        :data-is-grabbing="grabbing"
    >
        <div class="slider-block__wrapper">
            <Splide
                class="slider-block__slider"
                :options="sliderOptions"
                :has-track="false"
                ref="sliderRef"
                @splide:dragged="stopGrabbing"
            >
                <div class="slider-block__slider-inner">
                    <SplideTrack
                        class="slider-block__slider-track"
                        @mousedown="startGrabbing"
                        @mouseup="stopGrabbing"
                    >
                        <SplideSlide
                            v-for="(n, index) in slideList.length"
                            :key="`${index}-slider-item`"
                            class="slider-block__slider-item"
                        >
                        </SplideSlide>

                    </SplideTrack>
                </div>
            </Splide>

            <Splide
                class="slider-block__navigation"
                :options="navigationOptions"
                :has-track="false"
                ref="navigationRef"
                @splide:dragged="stopGrabbing"
            >
                <div class="slider-block__navigation-inner">
                    <SplideTrack
                        class="slider-block__navigation-track"
                        @mousedown="startGrabbing"
                        @mouseup="stopGrabbing"
                    >
                        <SplideSlide
                            v-for="(n, index) in slideList.length"
                            :key="`${index}-navigation-item`"
                            class="slider-block__navigation-item"
                            @keydown.up.prevent="toPrevSlide"
                            @keydown.left="toPrevSlide"
                            @keydown.down.prevent="toNextSlide"
                            @keydown.right="toNextSlide"
                        >
                        </SplideSlide>

                    </SplideTrack>
                </div>
            </Splide>


        </div>
    </section>

</template>