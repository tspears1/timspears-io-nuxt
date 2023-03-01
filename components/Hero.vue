<script setup>
    import { inView, timeline, stagger } from 'motion'

    const props = defineProps({
        title: String,
        eyebrow: String,
        billboard: Boolean
    })

    const heroRef = ref()
    const splitRef = ref()
    const eyebrowRef = ref()
    const words = computed(() => splitRef.value.wordWraps)
    const wordsY = computed(() => Number(getTranslateValues(words.value[0]).y))
    const heroY = computed(() => Number(getTranslateValues(heroRef.value).y))

    const sequence = computed(() => {
        let seq = [
            [words.value, { y: [ wordsY.value, 0 ] }, { duration: 0.5, delay: stagger(0.1), at: 0.25 }],
            [heroRef.value, { y: [ heroY.value, 0] }, { duration: 2.5, easing: cubicBezier.easeOutQuint, at: "+0.25" }],
        ]
        if (props.eyebrow) {
            seq = [...seq, ...eyebrowRef.value.enterSequence]
        }
        return seq
    })

    onMounted(() => {
        inView(heroRef.value, (info) => {
            timeline(sequence.value)
        })
    })


</script>

<template>
    <section ref="heroRef" :class="['hero', { '-billboard': billboard }]">
        <div class="hero__screen"></div>
        <div class="hero__grid">
            <Eyebrow
                v-if="eyebrow"
                :text="eyebrow"
                block="hero"
                ref="eyebrowRef"
                offset="-1.5"
            />
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