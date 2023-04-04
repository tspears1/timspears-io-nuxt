<script setup>
import { useDrag } from '@vueuse/gesture'
import { list } from 'radash'
import { animate, glide } from 'motion'

const galleryList = ref(list(1, 10))

const galleryTrack = ref()
const gallerySlide = ref()
const navTrackBack = ref()
const navTrackFront = ref()

const getSlide = (el) => {
    gallerySlide.value = el
}

const { frameBorder } = useFrame()
const { width: windowWidth } = useWindowSize()
const { width: trackWidth } = useElementSize(galleryTrack)
const { width: slideWidth } = useElementSize(gallerySlide)

const halfWindow = computed(() => (windowWidth.value - frameBorder.value * 2) / 2)
const halfSlide = computed(() => slideWidth.value / 2)

const trackMax = computed(() => Math.floor(halfWindow.value - trackWidth.value + halfSlide.value))

const updateCursor = (el, dragging) => {
    if( ! dragging ) {
        el.style.cursor = 'grab'
        return
    }
    el.style.cursor = 'grabbing'
}

const onGalleryDrag = ({ event, dragging, vxvy: [vx],offset: [offsetX] }) => {
    updateCursor(event.target, dragging)

    animate(galleryTrack.value,
            { x: offsetX },
            { easing: glide({
                velocity: vx * 100,
                power: 2,
                min: trackMax.value,
                max: 0,
                bounceStiffness: 150,
            })})

    animate([navTrackBack.value, navTrackFront.value],
            { x: offsetX / 10 },
            { easing: glide({
                velocity: vx / 10 * 100,
                power: 2,
                min: trackMax.value / 10,
                max: 0,
                bounceStiffness: 150,
            })})
}

const onNavDrag = ({ event, dragging, vxvy: [vx], offset: [offsetX] }) => {
    updateCursor(event.target, dragging)

    animate([navTrackBack.value, navTrackFront.value],
            { x: offsetX },
            { easing: glide({
                velocity: vx * 100,
                power: 2,
                min: trackMax.value / 10,
                max: 0,
                bounceStiffness: 300,
            })})

    animate(galleryTrack.value,
            { x: offsetX * 10 },
            { easing: glide({
                velocity: vx * 10 * 100,
                power: 2,
                min: trackMax.value,
                max: 0,
                bounceStiffness: 300,
            })})
}


useDrag(onGalleryDrag,{
    domTarget: galleryTrack,
    axis: 'x',
})

useDrag(onNavDrag,{
    domTarget: navTrackBack,
    axis: 'x',
})

</script>

<template>
    <section class="gallery-block">
        <div class="gallery-block__wrapper">
            <div class="gallery-block__gallery">
                <div class="gallery-block__gallery-inner">
                    <ul class="gallery-block__gallery-track" ref="galleryTrack">
                        <li
                            v-for="(n, index) in galleryList.length"
                            :key="`${index}-gallery-item`"
                            class="gallery-block__gallery-item"
                            :ref="getSlide"
                        >

                        </li>
                    </ul>
                </div>
            </div>
            <div class="gallery-block__footer">
                <nav class="gallery-block__navigation gallery-block__navigation--back">
                    <div class="gallery-block__navigation-frame">
                        <div class="gallery-block__navigation-inner">
                            <ul class="gallery-block__navigation-track" ref="navTrackBack">
                                <li
                                    v-for="(n, index) in galleryList.length"
                                    :key="`${index}-gallery-navigation-item`"
                                    class="gallery-block__navigation-item"
                                >
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <nav class="gallery-block__navigation gallery-block__navigation--front">
                    <div class="gallery-block__navigation-frame">
                        <div class="gallery-block__navigation-inner">
                            <ul class="gallery-block__navigation-track" ref="navTrackFront">
                                <li
                                    v-for="(n, index) in galleryList.length"
                                    :key="`${index}-gallery-navigation-item`"
                                    class="gallery-block__navigation-item"
                                >
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </section>
</template>