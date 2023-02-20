<template>
    <NuxtLink
        to="/"
        class="site-logo"
        @mouseover="isHovering = true"
        @mouseleave="isHovering = false"
    >
        <span class="sr-only">
            {{ props.title }}
        </span>
        <svg class="site-logo__svg" width="120" height="48" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4.37704 36.4438L19.7425 9.83008L35.1079 36.4438H4.37704Z"
                fill="var(--logo-fill, currentColor)"
                stroke="var(--logo-stroke, currentColor)"
                stroke-width="2"
                style="--delay-index: 1;"
                ref="triangle"
            />
            <rect
                x="44.6406"
                y="8.83008"
                width="28.1333"
                height="28.1333"
                fill="var(--logo-fill, currentColor)"
                stroke="var(--logo-stroke, currentColor)"
                stroke-width="2"
                style="--delay-index: 2;"
                ref="square"
            />
            <path
                d="M89.916 8.7965L106.282 8.7965L114.465 22.9696L106.282 37.1427L89.916 37.1427L81.7332 22.9696L89.916 8.7965Z"
                fill="var(--logo-fill, currentColor)"
                stroke="var(--logo-stroke, currentColor)"
                stroke-width="2"
                style="--delay-index: 3;"
                ref="hex"
            />
        </svg>
    </NuxtLink>
</template>

<script setup lang="ts">
import { animate, stagger } from 'motion'

const isHovering = ref(false)

const props = defineProps({
    title: {
        type: String,
        required: true,
    }
})

watch(isHovering, (value) => {
    if (value) {
        animate(
            document.querySelectorAll('.site-logo__svg > *'),
            { y: [0, -15, 0] },
            { delay: stagger(0.075), easing: easings.easeOutBounce, duration: 0.75 }
        )
    }
})

</script>
