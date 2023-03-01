<template>
    <main class="page-wrapper">
        <Hero :title="data.title" :billboard="true" eyebrow="Tim Spears"/>
    </main>
</template>

<script setup>
const { setTheme } = useTheme()
const { data } = useSanityQuery(groq`
    *[_type == "home"]{
        title
    }[0]
`)

onMounted(() => setTheme('laconia')) // how to make this part of every page load. need page context. useContext? with Memo/History?
</script>