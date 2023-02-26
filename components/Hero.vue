<script setup>
    import { inView, timeline, stagger } from 'motion'

    const props = defineProps({
        title: String,
        eyebrow: String,
        largeText: Boolean
    })

    const heroRef = ref()
    const splitRef = ref()
    const words = computed(() => splitRef.value.wordWraps)
    const wordsY = computed(() => Number(getTranslateValues(words.value[0]).y))
    const heroY = computed(() => Number(getTranslateValues(heroRef.value).y))

    const sequence = computed(() => [
        [words.value, { y: [ wordsY.value, 0 ] }, { duration: 0.5, delay: stagger(0.1), at: 0.25 }],
        [heroRef.value, { y: [ heroY.value, 0] }, { duration: 2.5, easing: cubicBezier.easeOutQuint, at: "+0.25" }]
    ])

    onMounted(() => {
        inView(heroRef.value, (info) => {
            timeline(sequence.value)
        })
    })


</script>

<template>
    <section ref="heroRef" :class="['hero', { '-large-text': largeText }]">
        <div class="hero__screen"></div>
        <div class="hero__grid">
            <h1 class="hero__title">
                <TextSplitting
                    :content="title"
                    :word-wrapper="true"
                    ref="splitRef"
                    block="hero"
                />
            </h1>
        </div>
    </section>
</template>