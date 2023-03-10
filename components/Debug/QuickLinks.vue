<template>
    <section class="style-wrapper">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/work">Work</NuxtLink>
        <NuxtLink to="/thoughts">Thoughts</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
    </section>
</template>

<style lang="scss">
.style-wrapper {
    background: var(--c-theme-text);
    color: var(--c-theme-000);
    display: grid;
    font-size: 1.1rem;
    gap: 28px;
    padding: 6rem;
}
</style>