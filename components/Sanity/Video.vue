<script setup>
import { inView } from 'motion'

const props = defineProps({
    autoplay: {
        type: Boolean,
        default: true,
    },
    block: {
        type: String,
        default: 'sanity-video',
    },
    lazy: {
        type: Boolean,
        default: true,
    },
    options: {
        type: Object,
        default: () => {
            return {
                controls: false,
                loop: true,
                muted: true,
                playsinline: true,
            }
        },
    },
    poster: {
        type: String,
        default: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    },
    src: {
        type: String,
        required: true,
    },
    videoClass: String,
})

const videoRef = ref()
const loadVideo = ref(false)

const playerPresets = {
    controls: true,
    loop: false,
    muted: false,
}

onMounted(() => {
    if (props.lazy) {
        inView(videoRef.value, () => {
            loadVideo.value = true
        }, { amount: 'any' })
    } else {
        loadVideo.value = true
    }
})

</script>

<template>
    <div
        :class="`${block}__video-wrapper`"
        ref="videoRef"
    >
        <video
            v-if="loadVideo"
            :class="[`${block}__video`, videoClass]"
            :poster="poster"
            :autoplay="autoplay"
            :src="src"
            v-bind="autoplay ? options : playerPresets"
        />
    </div>
</template>