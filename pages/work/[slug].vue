<script setup>
import { useProjectData } from '../../data/project';
const route = useRoute()
const { data } = useProjectData(route.params.slug)

</script>
<template>
    <main class="page-wrapper" v-if="data">
        <Hero class="-project" :title="data?.title" :eyebrow="data?.eyebrow "/>
        <FeaturedImage :src="data?.image" />
        <!-- Project Bar -->
        <BlockDesigner :content="data?.content" />
    </main>
</template>