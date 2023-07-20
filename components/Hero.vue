<script setup>
    import { timeline, stagger } from 'motion'
    import { usePortalStore } from '~/stores/portal'
    import { storeToRefs } from 'pinia'

    const portal = usePortalStore()
    const { transitionCompleted } = storeToRefs(portal)

    const props = defineProps({
        title: String,
        eyebrow: String,
        billboard: Boolean,
        compressed: Boolean,
    })

    const heroRef = ref()
    const splitRef = ref()
    const eyebrowRef = ref()
    const words = computed(() => splitRef.value.wordWraps)
    const wordsY = computed(() => getTranslateValues(words.value[0]).y)
    const heroY = computed(() => getTranslateValues(heroRef.value).y)

    const sequence = computed(() => {
        let seq = [
            [words.value, { y: [ wordsY.value, 0 ] }, { duration: 0.5, delay: stagger(0.1) }],
            [heroRef.value, { y: [ heroY.value, 0] }, { duration: 2.5, easing: cubicBezier.easeOutQuint, at: "+0.25" }],
        ]
        if (props.eyebrow) {
            seq = [...seq, ...eyebrowRef.value.enterSequence]
        }
        return seq
    })

    watch(transitionCompleted, (value) => {
        if ( value == true ) {
            let tl = timeline(sequence.value)
            setTimeout(() => {
                tl.pause()
            }, 1000);
        }
    })


</script>

<template>
    <section
        :class="['hero', { '-billboard': billboard, '-compressed' : compressed }]"
        class="-project"
    >
        <div class="hero__wrapper" ref="heroRef">
            <div class="hero__screen"></div>
            <div class="hero__grid">
                <Eyebrow
                    v-if="eyebrow"
                    :text="eyebrow"
                    block="hero"
                    ref="eyebrowRef"
                    offset="-1.5"
                    :autoplay="false"
                />
                <h1 class="hero__title" v-if="title">
                    <TextSplitting
                        :content="title"
                        :word-wrapper="true"
                        ref="splitRef"
                        block="hero"
                    />
                </h1>
            </div>
        </div>
    </section>
</template>

<style>
.debug {
    aspect-ratio: 1;
    background: hsl(var(--c-neutral-0-hsl) / 0.5);
    border: 2px solid var(--c-neutral-0);
    height: 20vmin;
    inset: 0 auto auto calc(50% - 10vmin);
    padding: 5vmin;
    position: fixed;
    z-index: 9999;
}
</style>