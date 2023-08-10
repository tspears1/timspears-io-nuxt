// https://nuxt.com/docs/api/configuration/nuxt-config

import { appDescription } from './constants/index'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
    modules: [
        '@nuxtjs/sanity',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@formkit/nuxt',
        'nuxt-gtag'
    ],
    gtag: {
        id: 'G-4SKS6C33B3',
    },
    runtimeConfig: {
        public: {
            EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
            EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
        }
    },
    sanity: {
        projectId: 'z0o6cgrz',
    },

    css: ['@/assets/scss/main.scss'],

    alias: {
        //'images': fileURLToPath(new URL('./assets/images', import.meta.url)),
        '@scss': "assets/scss",
        '@data': "data"
    },

    vite: {
        plugins: [
            svgLoader({
                svgo: false
            }),
        ]
    },

    app: {
        head: {
            viewport: 'width=device-width,initial-scale=1',
            link: [
                { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
                { rel: 'icon', type: 'image/svg+xml', href: '/hexfav.svg' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
            ],
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: appDescription },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
                { name: 'theme-color', content: '#000000' },
            ],
        },
    },
})

// <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
// <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
// <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
// <link rel="manifest" href="/site.webmanifest">
// <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0c4f75">
// <meta name="msapplication-TileColor" content="#2b5797">
// <meta name="theme-color" content="#ffffff">
