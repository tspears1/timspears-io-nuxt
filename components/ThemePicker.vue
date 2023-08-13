<script setup>
import { useThemePickerStore } from '~~/stores/themePicker'
import { storeToRefs } from 'pinia'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap.mjs'
import PaletteIcon from '~/assets/svgs/theme/palette.svg'

const { themes, activeTheme } = useThemes()
const _themePicker = useThemePickerStore()
const { themePickerOpen } = storeToRefs(_themePicker)

const reorderedThemes = computed(() => themes.value.sort((a, b) => a.slug.localeCompare(b.slug)))

const themePickerRef = ref()
const { activate, deactivate } = useFocusTrap(themePickerRef)

watch(themePickerOpen, (value) => {
    if (value == true) {
        waitForEl('.theme-picker__menuWrapper').then(() =>{
            activate()
        })
    } else {
        deactivate()
    }
})

const onInputChange = (theme) => {
    _themePicker.closeThemePicker()
    setTimeout(() => {
        _themePicker.updateTheme(theme.slug)
    }, 100)
}

</script>

<template>
    <div class="theme-picker" ref="themePickerRef">
        <button
            class="theme-picker__trigger"
            @click="_themePicker.toggleThemePicker"
        >
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
        <div
            class="theme-picker__menu"
            @keydown.esc="_themePicker.closeThemePicker"
        >
            <Presence>
                <Motion
                    v-if="themePickerOpen"
                    class="theme-picker__screen"
                    :initial="{ opacity: 0 }"
                    :animate="{
                        opacity: 1,
                        transition: { easing: cubicBezier.easeOutCirc, duration: 0.75 }
                    }"
                    :exit="{
                        opacity: 0,
                        transition: { easing: cubicBezier.easeOutCirc, duration: 0.75 }
                    }"
                    @click="_themePicker.closeThemePicker"
                />
            </Presence>
            <Presence>
                <Motion
                    v-if="themePickerOpen"
                    class="theme-picker__menuWrapper"
                    data-lenis-prevent
                    :initial="{ opacity: 0, y: 30 }"
                    :animate="{
                        opacity: 1, y: 0,
                        transition: { easing: cubicBezier.easeOutExpo, duration: 0.75 },
                    }"
                    :exit="{
                        opacity: 0, y: 30,
                        transition: { easing: cubicBezier.easeOutExpo, duration: 0.75 },
                    }"
                >
                    <ul class="theme-picker__list">
                        <li
                            v-for="theme in reorderedThemes"
                            :key="theme.name"
                            class="theme-picker__theme"
                            :class="{'theme-picker__theme--active': theme.name === activeTheme.name}"
                            :style="`--theme-bg: var(--c-theme-${theme.slug}-50);`"
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
                                @change="() => onInputChange(theme)"
                            />
                        </li>
                    </ul>
                </Motion>
            </Presence>
        </div>
    </div>
</template>