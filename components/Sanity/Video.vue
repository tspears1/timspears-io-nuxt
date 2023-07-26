<script setup>
import { inView } from 'motion'

const props = defineProps({
    alt: String,
    autoplay: {
        type: Boolean,
        default: true,
    },
    block: {
        type: String,
        default: 'sanity-video',
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

</script>

<template>
    <div
        :class="`${block}`"
        ref="videoRef"
    >
        <video
            :class="[`${block}__video`, videoClass]"
            :poster="poster"
            :autoplay="autoplay"
            :src="src"
            :options="options"
            :alt="alt"
        />
    </div>
</template>