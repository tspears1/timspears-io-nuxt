<script setup>
import { urlFor } from '/sanityClient.ts'
import { inView } from 'motion'
import { invoke } from '@vueuse/shared';

const props = defineProps({
    alt: String,
    callback: Function,
    pictureClass: String,
    imageClass: String,
    src: {
        type: Object,
        required: true,
    },
    quality: {
        type: Number,
        default: 75,
    },
    width: Number,
})

const imageRef = ref()
const isLoaded = ref(false)
const isInView = ref(false)

const assetWidth = computed(() => props.width ?? props.src.metadata.dimensions.width )
const defaultSizes = computed(() => [ 375, 600, 768, 992, 1200, 1600, 1840 ].filter(s => s < assetWidth.value ))
const srcset = computed(() => {
    const set = defaultSizes.value.map(size => `${urlFor(props.src).width(size).fit('max').auto('format').quality(props.quality)} ${size}w`)
    return set.join(', ')
})

onMounted(() => {
    imageRef.value.addEventListener('lazyloaded', () => isLoaded.value = true)
    inView(imageRef.value, () => isInView.value = true)
})

const stopEffect = watchEffect(() => {
    console.log('effect RUn')
    if ( props.callback ) {
        if ( isLoaded.value && isInView.value ) {
            props.callback()
            console.log('image ready')
            return () => stopEffect()
        }
    }
})

</script>

<template>
    <picture :class="pictureClass">
        <source
            data-sizes="auto"
            :data-srcset="srcset"
            type="image/webp"
        />
        <img
            :src="src.metadata.lqip"
            :class="[imageClass, `lazyload`]"
            :alt="alt"
            ref="imageRef"
        />
    </picture>
</template>
