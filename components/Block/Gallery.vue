<script setup>
import { useDrag } from '@vueuse/gesture'
import { list } from 'radash'
import { animate, glide } from 'motion'

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

const trackMax = computed(() => halfWindow.value - trackWidth.value + halfSlide.value)

const onDrag = ({ dragging, first, last, vxvy: [vx], offset: [offsetX], distance, direction: [directionX], lastOffset: [lastOffsetX] }) => {
    if( ! dragging ) {
        galleryTrack.value.style.cursor = 'grab'
        return
    }
    galleryTrack.value.style.cursor = 'grabbing'

    animate(galleryTrack.value,
        { x: offsetX },
        { easing: glide({
            velocity: vx * 200,
            power: 2.7,
            min: trackMax.value,
            max: 0,
            bounceStiffness: 150,
        })}
    )
}

const draggable = useDrag(onDrag,{
    domTarget: galleryTrack,
    axis: 'x',
})

onMounted(() => {

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