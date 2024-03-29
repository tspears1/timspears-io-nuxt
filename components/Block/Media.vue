<script setup>
import { scroll, timeline } from 'motion'
const props = defineProps({
    content: {
        type: Object,
        required: true,
    }
})

const { heading, media, layout } = props.content

const fullMediaRef = ref()
const overlayRef = ref()
const sectionRef = ref()

const spacing = {
    full:   1,
    half:   2,
    third:  3
}

const sectionCaption = computed(() => {
    if (layout == 'full') return [media[0].caption]
    if (layout == 'grid') return media.map((m, i) => m.caption ? `[${i + 1}] ${m.caption}` : null ).filter(c => c)
})

onMounted(() => {
    layout == 'full' && fullLayoutMotion()
    layout == 'grid' && gridLayoutMotion()
})

const fullLayoutMotion = () => {
    scroll(
        timeline([
            [fullMediaRef.value, { scale: [0.9, 1.2], y: [ '-75%', 0] }, { at: 0, easing: [0.33, 1, 0.68, 1] }],
            [overlayRef.value, { opacity: [1, 0] }, { at: 0, easing: cubicBezier.easeInCubic }]
        ]),
        { target: sectionRef.value, offset: ['start end', 'end end']}
    )
}

const gridLayoutMotion = () => {
    const gridMedia = sectionRef.value.querySelectorAll('.media-block__media')
    gridMedia.forEach((m, i) => {
        const image = m.querySelector('.media-block__picture') || m.querySelector('.media-block__video')
        const overlay = m.querySelector('.media-block__overlay')
        const gradient = m.querySelector('.media-block__gradient')
        scroll(
            timeline([
                [image, { scale: [2, 1], y: [ '-80%', 0], filter: ['blur(65px)', 'blur(0px)'] },
                    {
                        at: 0,
                        easing: [0.33, 1, 0.68, 1],
                        scale: { easing: cubicBezier.easeInCubic},
                        filter: { easing: cubicBezier.easeInCubic }
                    }
                ],
                [overlay, { opacity: [1, 0] }, { at: 0, easing: cubicBezier.easeInOutQuad }],
                [gradient, { opacity: [0.2, 1, 0], scale: [1.4, 1] }, {
                    at: 0,
                    easing: cubicBezier.easeInQuint,
                    scale: { easing: cubicBezier.easeInCubic },
                }]
            ]),
            { target: m, offset: ['0.0 0.9', '0.4 0.5']}
        )
    })
}

const getImageBackgroundVariable = (image) => {
    if (!image) return null
    const dominantColor = computed(() => convertHSL(image?.metadata?.palette?.dominant?.background ) ?? null )
    return dominantColor.value ? `--image-bg: ${dominantColor.value};` : null
}

</script>
<template>
    <section
        class="section media-block"
        :class="{ 'section--flush': layout == 'full' || layout == 'video' }"
        section-theme="light"
        :media-layout="layout"
        ref="sectionRef"
    >
        <h3
            v-if="heading?.text"
            class="section__heading media-block__heading"
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
        <div v-if="layout == 'full'" class="section__content media-block__content--full">
            <div
                class="media-block__media"
                ref="fullMediaRef"
                :style="`--media-hotspot-x: ${ media[0]?.hotspot?.x ? (media[0].hotspot.x * 100).toFixed(2) : 50}%; --media-hotspot-y: ${ media[0]?.hotspot?.y ? (media[0].hotspot.y * 100).toFixed(2) : 50}%;`"
            >
                <SanityImage
                    v-if="media[0].type == 'image'"
                    block="media-block"
                    :src="media[0].image"
                />
            </div>
            <div class="media-block__overlay" ref="overlayRef"></div>
        </div>
        <div v-else-if="layout == 'grid'" class="section__content media-block__content--grid">
            <div
                class="media-block__media"
                v-for="(item, index) in media"
                :key="item.type == 'image' ? item.image._id : item.video._id ?? index"
                :ratio-gradient="item.ratio || '16:9'"
                :media-fit="!item.ratio ? 'contain' : 'cover'"
                :media-type="item.type"
                :style="`${getImageBackgroundVariable(item?.image) ?? ''} --media-index: ${index}; --media-group-length: ${media.length}; --media-spacing: ${spacing[item.spacing]}; --media-ratio: ${ratioStringToNumber(item?.ratio) || 'auto' }; --media-hotspot-x: ${ item?.hotspot?.x ? (item.hotspot.x * 100).toFixed(2) : 50}%; --media-hotspot-y: ${ item?.hotspot?.y ? (item.hotspot.y * 100).toFixed(2) : 50}%;`"
            >
                <SanityImage
                    v-if="item.type == 'image'"
                    block="media-block"
                    :src="item.image"
                />
                <SanityVideo
                    v-if="item.type == 'video'"
                    block="media-block"
                    :src="item.video.url"
                />
                <div class="media-block__overlay"></div>
                <div class="media-block__gradient"></div>
            </div>
        </div>
        <div v-else-if="layout == 'video'" class="section__content media-block__content--video">
            <VideoPlayer
                v-if="media[0].type == 'video'"
                :video="media[0].video.url"
                :poster="media[0].poster"
                :background="media[0].background"
                :ratio="ratioStringToNumber(media[0].ratio)"
            />
        </div>
        <div class="media-block__caption">{{ sectionCaption?.join('  ')}}</div>
    </section>
</template>