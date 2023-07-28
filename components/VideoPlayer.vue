<script setup>

const props = defineProps({
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

</script>

<template>
    <div class="video-player">
        <Presence>
            <Motion
                tag="video"
                v-if="loadVideo"
                class="video-player__video"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                controls
                playsinline
            />
        </Presence>
        <SanityImage
            v-if="poster"
            block="video-player"
            class="video-player__poster"
            :src="poster"
        />
        <div class="video-player__controls">
            <button
                class="video-player__trigger"
                @click="loadVideo = true"
            >
                <div class="sr-only">Play Video</div>
                <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26 15L0.499999 29.7224L0.5 0.277567L26 15Z" fill="var(--icon-fill, currentColor)"/>
                </svg>

            </button>
        </div>

    </div>
</template>