<script setup>
import { useDrag } from '@vueuse/gesture'
import { list } from 'radash'
import { timeline, animate, glide } from 'motion'

const galleryList = ref(list(1, 10))

const galleryTrack = ref()
const gallerySlide = ref()
const navTrackBack = ref()
const navTrackFront = ref()

const { frameBorder } = useFrame()
const { width: windowWidth } = useWindowSize()
const { width: trackWidth } = useElementSize(galleryTrack)

const slideWidth = computed(() => trackWidth.value / galleryList.value.length / 2)
const halfWindow = computed(() => (windowWidth.value - frameBorder.value * 2) / 2)
const halfSlide = computed(() => slideWidth.value / 2)

const trackMax = computed(() => Math.floor(halfWindow.value - trackWidth.value + halfSlide.value))

const onGalleryDrag = ({ dragging, first, last, vxvy: [vx], offset: [offsetX] }) => {
    if( ! dragging ) {
        galleryTrack.value.style.cursor = 'grab'
        return
    }
    galleryTrack.value.style.cursor = 'grabbing'

    animate(galleryTrack.value,
            { x: offsetX },
            { easing: glide({
                velocity: vx * 200,
                power: 1.7,
                min: trackMax.value,
                max: 0,
                bounceStiffness: 150,
            }), at: 0})

    animate([navTrackBack.value, navTrackFront.value],
            { x: offsetX / 10 },
            { easing: glide({
                velocity: vx / 10 * 200,
                power: 1.7,
                min: trackMax.value / 10,
                max: 0,
                bounceStiffness: 150,
            }), at: 0})
}

const onNavDrag = ({ dragging, first, last, vxvy: [vx], offset: [offsetX] }) => {
    if( ! dragging ) {
        navTrackBack.value.style.cursor = 'grab'
        return
    }
    navTrackBack.value.style.cursor = 'grabbing'

    animate([navTrackBack.value, navTrackFront.value],
            { x: offsetX },
            { easing: glide({
                velocity: vx * 200,
                power: 1.7,
                min: trackMax.value / 10,
                max: 0,
                bounceStiffness: 150,
            }), at: 0})

    animate(galleryTrack.value,
            { x: offsetX * 10 },
            { easing: glide({
                velocity: vx * 10 * 200,
                power: 1.7,
                min: trackMax.value,
                max: 0,
                bounceStiffness: 150,
            }), at: 0})

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
                            :ref="gallerySlide"
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