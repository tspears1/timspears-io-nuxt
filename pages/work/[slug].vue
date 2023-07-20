<script setup>
import { useProjectData } from '../../data/project';
const route = useRoute()
const { data } = useProjectData(route.params.slug)
// :hero-size="data?.heroSize || 'lg'"
// class='-project'
</script>
<template>
    <main class="page-wrapper">
        <Hero :title="data?.title" :eyebrow="data?.eyebrow " v-if="data"/>
        <FeaturedImage :src="data?.image" v-if="data" />
        <ProjectBar :client="data?.client" :year="data?.year" :services="data?.services" v-if="data" />
        <BlockDesigner :content="data?.content ?? []" v-if="data" />
    </main>
</template>