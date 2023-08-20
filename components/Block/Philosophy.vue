<script setup>
import { inView } from 'motion'

const blockRef = ref(null)
const visible = ref(false)

onMounted(() => {
    inView(blockRef.value, () => {
        visible.value = true

        return () => {
            visible.value = false
        }
    }, { amount: 0.5 })
})
</script>

<template>
    <section
        class="section philosophy-block"
        :class="{'in-view': visible }"
        section-theme="dark"
        section-layout="columns"
        ref="blockRef"
    >
        <div class="philosophy-block__heading">
            <Eyebrow
                text="Core Values"
                :offset="0.5"
                class="section__eyebrow philosophy-block__eyebrow"
            />
            <h2 class="philosophy-block__title">
                <div class="philosophy-block__title-wrapper" style="--index: 1">
                    <span>Create</span>
                </div>
                <div class="philosophy-block__title-wrapper" style="--index: 2">
                    <span>a</span>
                </div>
                <div class="philosophy-block__title-wrapper" style="--index: 3">
                    <span>web</span>
                </div>
                <div class="philosophy-block__title-wrapper" style="--index: 4">
                    <span>that</span>
                </div>
                <div class="philosophy-block__title-wrapper" style="--index: 5">
                    <span>is</span>
                </div>
            </h2>
        </div>
        <div class="philosophy-block__content">
            <ol class="philosophy-block__list">
                <li class="philosophy-block__item">
                    <div class="philosophy-block__value">
                        Vibrant
                    </div>
                </li>
                <li class="philosophy-block__item">
                    <div class="philosophy-block__value">
                        Inclusive
                    </div>
                </li>
                <li class="philosophy-block__item">
                    <div class="philosophy-block__value">
                        Easy
                    </div>
                </li>
                <li class="philosophy-block__item">
                    <div class="philosophy-block__value">
                        Adaptive
                    </div>
                </li>
                <li class="philosophy-block__item">
                    <div class="philosophy-block__value">
                        Useful
                    </div>
                </li>
            </ol>
        </div>
    </section>
</template>