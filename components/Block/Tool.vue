<script setup>

const props = defineProps({
    content: {
        type: Object,
        required: true,
    }
})

const { heading, eyebrow, theme, tools } = props.content

</script>

<template>
    <section
        class="section tool-block"
        :section-theme="theme"
    >
        <Eyebrow
            v-if="eyebrow"
            :text="eyebrow"
            :offset="0.5"
            class="section__eyebrow tool-block__eyebrow"
        />

        <h3
            class="section__heading tool-block__heading"
            :heading-size="heading.size"
            :heading-style="heading.style"
        >
            <TextMotion
                v-if="heading?.text"
                :text="heading.text"
                exit
                :stagger="0.035"
                :duration="0.5"
                :inview="0.95"
                transition-type="letter"
                :transition-name="['slide-up', 'slide-down']"
            />
        </h3>

        <ul v-if="tools" class="tool-block__grid">
            <li
                v-for="tool in tools"
                :key="tool.slug"
                class="tool-block__item"
            >
                <div class="tool-block__item-content">
                    <div class="tool-block__item-label">
                        {{  tool.label }}
                    </div>
                    <div v-if="tool.description" class="tool-block__item-description">
                        {{  tool.description }}
                    </div>
                </div>
                <div class="tool-block__item-media">
                    <IconTool class="-coin-icon" :icon="tool.library" />
                </div>
            </li>
        </ul>
    </section>
</template>