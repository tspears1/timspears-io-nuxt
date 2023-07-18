<script setup>
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'

const props = defineProps({
    content: {
        type: Object,
        required: true,
    }
})

const { heading, mediaGroup } = props.content

const sliderRef = ref()
const navigationRef = ref()
const grabbing = ref(false)
const activeSlide = ref(0)

const isFirstSlide = computed(() => activeSlide.value === 0)
const isLastSlide = computed(() => activeSlide.value === mediaGroup.length - 1)

const sliderOptions = {
    arrows: false,
    gap: 'var(--slider-slide-gap)',
    flickPower: 300,
    flickMaxPages: 1,
    pagination: false,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    updateOnMove: true,
    speed: 1200,
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
    speed: 1200,
}

const navSplide = computed(() => navigationRef.value.splide)

onMounted(() => {
    const navSplide = navigationRef.value?.splide
    addNavWindow()
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

const addNavWindow = () => {
    const navTrack = navigationRef.value?.splide?.Components.Elements.track
    const navWindow = document.createElement('div')
    navWindow.classList.add('slider-block__navigation-window')
    navTrack.appendChild(navWindow)
}

const updateActiveSlide = (splide, current, previous) => activeSlide.value = current

</script>

<template>
    <section
        class="slider-block"
        :data-is-grabbing="grabbing"
    >
        <h3
            v-if="heading?.text"
            class="section__heading slider-block__heading"
            :heading-size="heading.size"
            :heading-style="heading.style"
        >
            <TextMotion
                :text="heading.text"
                exit
                :stagger="0.035"
                :duration="0.5"
                :inview="0.95"
                transition-type="letter"
                :transition-name="['slide-left', 'slide-right']"
            />
        </h3>
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
                            v-for="(item, index) in mediaGroup"
                            :key="`${index}-slider-item`"
                            class="slider-block__slider-item"
                        >
                            <div class="slider-block__slider-item-wrapper">
                                <SanityImage
                                    block="slider-block"
                                    :src="item.image"
                                    :style="`--media-hotspot-x: ${ item?.hotspot?.x ? (item.hotspot.x * 100).toFixed(2) : 50}%; --media-hotspot-y: ${ item?.hotspot?.y ? (item.hotspot.y * 100).toFixed(2) : 50}%;`"
                                />
                            </div>
                            <div class="slider-block__slider-item-caption">{{  item.caption }}</div>
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
                @splide:move="updateActiveSlide"
            >
                <div
                    class="slider-block__navigation-inner"
                    :class="{'slider-block__navigation--first': isFirstSlide, 'slider-block__navigation--last': isLastSlide}"
                >
                    <SplideTrack
                        class="slider-block__navigation-track"
                        @mousedown="startGrabbing"
                        @mouseup="stopGrabbing"
                    >
                        <SplideSlide
                            v-for="(n, index) in mediaGroup"
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