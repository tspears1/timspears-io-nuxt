<script setup>
import { scroll, timeline, ScrollOffset } from 'motion'
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
            [fullMediaRef.value, { scale: [1, 1.2], y: [ '-50%', 0] }, { at: 0, easing: [0.33, 1, 0.68, 1] }],
            [overlayRef.value, { opacity: [1, 0] }, { at: 0, easing: cubicBezier.easeInCubic }]
        ]),
        { target: sectionRef.value, offset: ['start end', 'end end']}
    )
}

const gridLayoutMotion = () => {
    const gridMedia = sectionRef.value.querySelectorAll('.media-block__media')
    gridMedia.forEach((m, i) => {
        const image = m.querySelector('.media-block__picture')
        const overlay = m.querySelector('.media-block__overlay')
        const gradient = m.querySelector('.media-block__gradient')
        scroll(
            timeline([
                [image, { scale: [2, 1], y: [ '-80%', 0], filter: ['blur(65px)', 'blur(0px)'] },
                    {
                        at: 0,
                        easing: [0.33, 1, 0.68, 1],
                        scale: { easing: cubicBezier.easeInQuad},
                        filter: { easing: cubicBezier.easeInQuad }
                    }
                ],
                [overlay, { opacity: [1, 0] }, { at: 0, easing: cubicBezier.easeInCubic }],
                [gradient, { opacity: [0, 1, 0], scale: [1.1, 1] }, {
                    at: 0,
                    easing: cubicBezier.easeInCubic,
                    scale: { easing: cubicBezier.easeInQuad },
                }]
            ]),
            { target: m, offset: ['0.3 0.8', '0 0.2']}
        )
    })
}

</script>
<template>
    <section
        class="section media-block"
        :class="{ 'section--flush': layout == 'full' }"
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
                :key="item.image._id"
                :media-aspect-ratio="item.ratio || '16:9'"
                :style="`--media-index: ${index}; --media-group-length: ${media.length}; --media-spacing: ${spacing[item.spacing]}; --media-ratio: ${ratioStringToNumber(item.ratio || '16:9')}; --media-hotspot-x: ${ item?.hotspot?.x ? (item.hotspot.x * 100).toFixed(2) : 50}%; --media-hotspot-y: ${ item?.hotspot?.y ? (item.hotspot.y * 100).toFixed(2) : 50}%;`"
            >
                <SanityImage
                    block="media-block"
                    :src="item.image"
                />
                <div class="media-block__overlay"></div>
                <div class="media-block__gradient"></div>
            </div>
        </div>
        <div class="media-block__caption">{{ sectionCaption.join(' | ') }}</div>
    </section>
</template>