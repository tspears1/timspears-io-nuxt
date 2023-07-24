<script setup>
import { useProjectData } from '../../data/project';
const route = useRoute()
const { data } = useProjectData(route.params.slug)

</script>
<template>
    <main class="page-wrapper">
        <Hero
            class='-project'
            :title="data?.title"
            :eyebrow="data?.eyebrow "
            v-if="data"
            :hero-size="data?.heroSize || 'lg'"
        />
        <FeaturedImage
            :src="data?.image"
            v-if="data"
        />
        <ProjectBar
            :client="data?.client"
            :year="data?.year"
            :services="data?.services"
            v-if="data"
        />
        <BlockDesigner
            :content="data?.content ?? []"
            v-if="data"
        />
        <ProjectNext />
    </main>
</template>