<template>
    <div class="site-wrapper">
        <slot />
    </div>
</template>

<style lang="scss">
.site-wrapper {
    --bg-pattern-size: 3px;
    --bg-pattern-dot: 1px;
    --bg-pattern-alpha: 0.2;
    background-color: var(--c-theme-fff);
    background-image:  radial-gradient(rgba(var(--c-theme-000-rgb), var(--bg-pattern-alpha)) var(--bg-pattern-dot), transparent var(--bg-pattern-dot)), radial-gradient(rgba(var(--c-theme-000-rgb), var(--bg-pattern-alpha)) var(--bg-pattern-dot), rgba(var(--c-theme-fff-rgb), var(--bg-pattern-alpha)) var(--bg-pattern-dot));
    background-size: calc(var(--bg-pattern-size) * 2) calc(var(--bg-pattern-size) * 2);
    background-position: 0 0, var(--bg-pattern-size) var(--bg-pattern-size);
}
</style>
