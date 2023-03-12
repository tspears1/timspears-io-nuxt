// Register Motion and Presence as global components so that works with auto import

// @ts-expect-error Won't find typings, as this is a temporary solution
import { Motion as _motion, Presence as _presence } from "@motionone/vue/dist/motion-vue.esm.js"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("Motion", _motion);
    nuxtApp.vueApp.component("Presence", _presence);
});
