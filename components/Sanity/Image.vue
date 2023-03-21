<script setup>
import { urlFor } from '/sanityClient.ts'
import { inView } from 'motion'

const props = defineProps({
    alt: String,
    amountInView: {
        type: [Number, String],
        default: 0.5,
    },
    block: {
        type: String,
        default: 'sanity-image',
    },
    callback: Function,
    imageClass: String,
    pictureClass: String,
    quality: {
        type: Number,
        default: 75,
    },
    src: {
        type: Object,
        required: true,
    },
    width: Number,
})

const imageRef = ref()

const assetWidth = computed(() => props.width ?? props.src.metadata.dimensions.width )

const defaultSizes = computed(() => [ 375, 600, 768, 992, 1200, 1600, 1840 ].filter(s => s < assetWidth.value ))
const srcset = computed(() => {
    const set = defaultSizes.value.map(size => `${urlFor(props.src).width(size).fit('max').auto('format').quality(props.quality)} ${size}w`)
    return set.join(', ')
})

onMounted(() => {
    props.callback && inView(imageRef.value, () => props.callback(), { amount: props.amountInView })
})

</script>

<template>
    <picture
        :class="[`${block}__picture`, pictureClass]"
        ref="imageRef"
    >
        <source
            data-sizes="auto"
            :data-srcset="srcset"
            type="image/webp"
        />
        <img
            :src="src.metadata.lqip"
            :class="[imageClass, `${block}__img lazyload`]"
            :alt="alt"
        />
    </picture>
</template>
