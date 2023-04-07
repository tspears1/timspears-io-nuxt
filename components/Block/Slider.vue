<script setup>
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'

import { list } from 'radash'

const slideList = ref(list(1, 10))


const sliderOptions = {
    gap: 'var(--slider-slide-gap)',
    flickPower: 500,
    flickMaxPages: 2,
}


</script>

<template>
    <section class="slider-block">
        <div class="slider-block__wrapper">
            <Splide
                class="slider-block__slider"
                :options="sliderOptions"
                :has-track="false"
            >
                <div class="slider-block__slider-inner">
                    <SplideTrack
                        class="slider-block__slider-track"
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


        </div>
    </section>

</template>