<script setup>

const { themes } = useThemes()
const isMounted = ref(false)

onMounted(() => isMounted.value = true )

</script>

<template>
    <section class="colorsheet" v-if="isMounted">
        <article
            class="colorsheet-theme"
            v-for="theme in themes"
            :key="theme.slug"
        >
            <h2>{{  theme.name }}</h2>

            <div
                class="colorsheet-theme-grid"
            >
                <div
                    class="colorsheet-theme-tile"
                    :style="`--tile-bg: hsl(${color});`"
                    :data-color="`hsl(${color})`"
                    v-for="color in theme.palette"
                    :key="color"
                />
            </div>

        </article>
    </section>
</template>

<style lang="scss">
.colorsheet {
    background: var(--c-theme-text);
    display: grid;
    gap: 90px;
    margin-top: calc(25vh - var(--header-height));
    overflow: auto;
    padding: 10vh 10vw;
    width: 100%;
}

.colorsheet-theme {
    display: grid;
    gap: 60px;

    h2 {
        font-size: 3rem;
        font-weight: 900;
        color: var(--c-theme-bg);
        text-transform: uppercase;
    }

    &-grid {
        display: grid;
        gap: 1.25rem;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }

    &-tile {
        aspect-ratio: 1/1;
        background: var(--tile-bg);
        box-shadow: 2px 2px 8px hsl(0 0% 0% / 0.15);
        display: grid;
        place-items: center;
        width: 100%;

        &::before {
            grid-area: 1 / 1 / 1 / 1;
            content: attr(data-color);
            font-size: 1.1rem;
            font-weight: 600;
            text-transform: uppercase;
        }
    }
}
</style>