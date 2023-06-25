<script setup>
const props = defineProps({
    src: {
        type: Object,
        required: true,
    }
})


const dominantColor = computed(() => convertHSL(props.src?.image?.metadata?.palette?.dominant?.background ) ?? null )
const background = computed(() => {
    const bg = props.src?.background
    return bg ? `hsl(${Math.round(bg.hsl.h || 0)}  ${Math.round(bg.hsl.s * 100)}% ${Math.round(bg.hsl.l * 100)}%)` : dominantColor.value
})

</script>

<template>
    <section class="featured-image" :style="`--image-bg: ${background};`" :data-fit="src?.fit ? 'contain' : 'cover'">
        <SanityImage
            block="featured-image"
            :src="src.image"
            :amount-in-view="0.5"
        />
    </section>
</template>