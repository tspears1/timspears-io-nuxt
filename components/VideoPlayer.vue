<script setup>

const props = defineProps({
    background: {
        type: [String, Object],
    },
    poster: {
        type: [String, Object],
        required: true,
    },
    ratio: {
        type: [String, Number],
        default: 16 / 9,
    },
    video: {
        type: String,
        required: true,
    },
})

const loadVideo = ref(false)
const videoRef = ref()

const onClick = () => {
    loadVideo.value = true
}

</script>

<template>
    <div
        class="video-player"
        :class="{ 'video-player--loaded': loadVideo }"
        :style="`--video-bg-hsl: ${convertHSL(background.hex)}; --video-ratio: ${ratio};`"
    >
        <div class="video-player__container">
            <div class="video-player__grid">
                <SanityImage
                    v-if="poster"
                    block="video-player"
                    class="video-player__poster"
                    :src="poster"
                />
                <Presence>
                    <Motion
                        v-if="!loadVideo"
                        class="video-player__controls"
                        :initial="{ opacity: 0 }"
                        :animate="{ opacity: 1 }"
                        :exit="{ opacity: 0 }"
                    >
                        <button
                            class="video-player__trigger"
                            @click="onClick"
                        >
                            <div class="sr-only">Play Video</div>
                            <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26 15L0.499999 29.7224L0.5 0.277567L26 15Z" fill="var(--icon-fill, currentColor)"/>
                            </svg>

                        </button>
                    </Motion>
                </Presence>
                <Presence>
                    <Motion
                        tag="video"
                        v-if="loadVideo"
                        class="video-player__video"
                        :initial="{ opacity: 0 }"
                        :animate="{ opacity: 1 }"
                        controls
                        playsinline
                        autoplay
                        :src="video"
                        ref="videoRef"
                    />
                </Presence>
            </div>
        </div>
    </div>
</template>