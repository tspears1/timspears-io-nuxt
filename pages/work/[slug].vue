<script setup>
const route = useRoute()

const title = route.params.slug

</script>
<template>
    <main class="page-wrapper">
        <Hero :title="title" />
        <!-- <BlockGallery /> -->
        <BlockSlider />
    </main>
</template>