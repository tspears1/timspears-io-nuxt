<script setup>
const isOpen = ref(false)

const onClick = () => {
    console.log('clicked')
    isOpen.value = isOpen.value ? false : true
}
</script>

<template>
    <button :class="[`menu-grid`, { '-is-open': isOpen }]" @click="onClick">
        <span class="sr-only"></span>
        <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle class="menu-grid__dot" cx="3" cy="10" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="menu-grid__dot" cx="11" cy="2" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="menu-grid__dot" cx="11" cy="26" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="menu-grid__dot" cx="3" cy="18" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="menu-grid__dot" cx="27" cy="10" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="menu-grid__dot" cx="19" cy="2" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="menu-grid__dot" cx="19" cy="26" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="menu-grid__dot" cx="27" cy="18" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="menu-grid__dot menu-grid-dot--opened" cx="11" cy="10" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="menu-grid__dot menu-grid-dot--opened" cx="3" cy="2" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="menu-grid__dot menu-grid-dot--opened" cx="3" cy="26" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="menu-grid__dot menu-grid-dot--opened" cx="11" cy="18" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="menu-grid__dot menu-grid-dot--opened" cx="19" cy="10" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="menu-grid__dot menu-grid-dot--opened" cx="27" cy="2" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="menu-grid__dot menu-grid-dot--opened" cx="27" cy="26" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <circle class="menu-grid__dot menu-grid-dot--opened" cx="19" cy="18" r="2" fill="var(--menu-icon-dots-color, #0C4F75)"/>
            <line class="menu-grid__bar menu-grid__bar--closed" x1="3" y1="2" x2="27" y2="2" stroke="var(--menu-icon-closed-bars-color, #0C4F75)" stroke-width="4" stroke-linecap="round"/>
            <line class="menu-grid__bar menu-grid__bar--closed" x1="3" y1="10" x2="27" y2="10" stroke="var(--menu-icon-closed-bars-color, #0C4F75)" stroke-width="4" stroke-linecap="round"/>
            <line class="menu-grid__bar menu-grid__bar--closed" x1="3" y1="18" x2="27" y2="18" stroke="var(--menu-icon-closed-bars-color, #0C4F75)" stroke-width="4" stroke-linecap="round"/>
            <line class="menu-grid__bar menu-grid__bar--closed" x1="3" y1="26" x2="27" y2="26" stroke="var(--menu-icon-closed-bars-color, #0C4F75)" stroke-width="4" stroke-linecap="round"/>
            <line class="menu-grid__bar menu-grid__bar--opened" x1="2.82843" y1="2" x2="27" y2="26.1716" stroke="var(--menu-icon-opened-bars-color, #0C4F75)" stroke-width="4" stroke-linecap="round"/>
            <line class="menu-grid__bar menu-grid__bar--opened" x1="3" y1="26.1716" x2="27.1716" y2="2" stroke="var(--menu-icon-opened-bars-color, #0C4F75)" stroke-width="4" stroke-linecap="round"/>
        </svg>
    </button>
</template>

<style lang="scss">
@use "@/assets/scss/abstracts/" as *;
.menu-grid {
    $b: &;
    --menu-icon-dots-color: var(--c-theme-000);
    --menu-icon-closed-bars-color: var(--c-theme-000);
    --menu-icon-opened-bars-color: var(--c-theme-000);
    @include button-reset();
    @include size(1.875rem);
    position: relative;
    z-index: 1;

    &__dot,
    &__bar {
        transition: opacity 300ms ease-in-out, stroke 300ms ease-in-out, fill 300ms ease-in-out;
    }

    &__bar {
        opacity: 0;
    }

    &:hover {
        cursor: pointer;

        #{$b}__bar--closed {
            opacity: 0.8;
        }
    }

    &.-is-open {
        #{$b}__dot:where(:not(.menu-grid-dot--opened)) {
            opacity: 0;
        }

        &:hover {
            #{$b}__bar--opened {
                opacity: 0.4;
            }

            #{$b}__bar--closed {
                opacity: 0;
            }
        }
    }
}
</style>