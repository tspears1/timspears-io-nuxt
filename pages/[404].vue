<template>
    <main>
        <h1>404</h1>

        <NuxtLink to="/">Back Home</NuxtLink>
        <button @click="router.back()">
            Go Back
        </button>
    </main>
</template>
<script setup>

const router = useRouter()

</script>