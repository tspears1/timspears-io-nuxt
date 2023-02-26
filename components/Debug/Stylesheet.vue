<script setup>
const fonts = [
    {
        name: 'modern',
        variants: [
            'thin',
            'extralight',
            'light',
            'regular',
            'medium',
            'bold',
            'black',
        ]
    },
    {
        name: 'poster',
        variants: [
            '',
            'italic'
        ],
    },
    {
        name: 'display',
        variants: [
            '',
            'italic'
        ]
    },
    {
        name: 'classic',
        variants: [
            'regular',
            'regular-italic',
            'semibold',
            'semibold-italic',
            'bold',
            'bold-italic',
            'black',
            'black-italic',
        ]
    }
]

const classes = computed(() => {
    let x = []
    fonts.forEach(f => {
        f.variants.forEach(v => {
            x = [...x, `${f.name}${v.length ? '-' + v : ''}`]
        })
    })
    return x
})

</script>
<template>
    <div class="style-wrapper">
        <div v-for="name in classes" :key="name" :class="name">
            <div>softly dancing neon cosmic fugue</div>
            <small>{{ name }}</small>
        </div>
    </div>
</template>

<style lang="scss">
.style-wrapper {
    color: var(--c-theme-000);
    display: grid;
    font-size: 4vw;
    gap: 28px;
    padding: 25vh 0;

    small {
        font-size: 0.75rem;
        text-transform: uppercase;
    }
}
</style>