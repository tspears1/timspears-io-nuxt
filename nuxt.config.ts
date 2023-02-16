// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: ['@nuxtjs/sanity'],

    sanity: {
        projectId: 'z0o6cgrz',
    },

    css: ['@/assets/scss/main.scss'],

    alias: {
        //'images': fileURLToPath(new URL('./assets/images', import.meta.url)),
        '@scss': "assets/scss",
    }
})

// swiper
// pinia
// image
// vueuse
// headless ui
// formkit
// nuxt-viewport
// radash
// what-input
// lazy-sizes
