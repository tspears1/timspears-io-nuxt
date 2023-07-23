<script setup>
import { usePageContextStore } from '~~/stores/portal'
import PaletteIcon from '~/assets/svgs/theme/palette.svg'

const { themes, activeTheme, setActiveTheme } = useThemes()
const { updateContext } = usePageContextStore()
const updateTheme = (slug) => {
    updateContext('current', {
        theme: slug
    })
    setActiveTheme(slug)
}
</script>

<template>
    <div class="theme-picker">
        <button class="theme-picker__trigger">
            <div class="theme-picker__activeIcon">
                <PaletteIcon />
            </div>
            <div class="theme-picker__triggerText">
                <span class="theme-picker__triggerTitle">
                    Current Theme:
                </span>
                <span class="theme-picker__triggerCurrent">
                    {{ activeTheme.name }}
                </span>
            </div>
        </button>
        <div class="theme-picker__menu">
            <ul class="theme-picker__list">
                <li
                    class="theme-picker__theme"
                    :class="{'theme-picker__theme--active': theme.name === activeTheme.name}"
                    v-for="theme in themes"
                    :key="theme.name"
                >
                    <div class="theme-picker__themeIcon">
                        <PaletteIcon
                            :style="`--icon-color-start: var(--c-theme-${theme.slug}-800); --icon-color-end: var(--c-theme-${theme.slug}-200);`"
                        />
                    </div>
                    <label :for="`theme-${theme.slug}`" class="theme-picker__themeLabel">
                        {{ theme.name }}
                    </label>
                    <input
                        type="radio"
                        :id="`theme-${theme.slug}`"
                        :value="theme.slug"
                        :checked="theme.slug === activeTheme.slug"
                        @change="updateTheme(theme.slug)"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>