<script setup>
import { inView } from 'motion'

const route = useRoute()
const props = defineProps({
    content: {
        type: Object,
        required: true,
    }
})

const { heading, awards } = props.content

const awardsRef = ref(null)
const isInView = ref(false)

onMounted(() => {
    inView(awardsRef.value, () => {
        isInView.value = true

        return () => {
            isInView.value = false
        }
    }, { amount: 'any' })
})

</script>
<template>
    <section class="section awards-block" section-theme="light">
        <h3
            v-if="heading"
            class="section__heading awards-block__heading"
            :heading-size="heading.size"
            :heading-style="heading.style"
        >
            <TextMotion
                :text="heading.text"
                exit
                :stagger="0.035"
                :duration="0.5"
                :inview="0.95"
                transition-type="letter"
                :transition-name="['slide-left', 'slide-right']"
            />
        </h3>

        <div
            class="awards-block__awards"
            :in-view="isInView || null"
            :style="`--list-length: ${awards.length};`"
            ref="awardsRef"
        >
            <div
                class="awards-block__award"
                v-for="(award, index) in awards"
                :key="award.id"
                :style="`--index: ${index};`"
            >
                <div class="awards-block__col">
                    <h4
                        class="awards-block__text"
                        v-if="award.title"
                    >
                        {{ award.title }}
                    </h4>
                    <div
                        class="awards-block__subtext"
                        v-if="award.subtitle"
                    >
                        {{ award.subtitle }}
                    </div>
                </div>
                <div class="awards-block__col">
                    <div
                        class="awards-block__text"
                        v-if="award.competition"
                    >
                        {{ award.competition }}
                    </div>
                    <div
                        class="awards-block__subtext"
                        v-if="award.presenter"
                    >
                        {{ award.presenter.title }}
                    </div>
                </div>
                <div class="awards-block__col">
                    <NuxtLink
                        v-if="award.relatedProject && award.relatedProject.slug != route.params.slug"
                        class="awards-block__text"
                        :to="award.relatedProject.slug"
                    >
                        {{ award.relatedProject.title }}
                    </NuxtLink>
                    <div
                        class="awards-block__text"
                        v-else-if="award.relatedProject"
                    >
                        {{ award.relatedProject.title }}
                    </div>
                </div>

            </div>
        </div>

    </section>
</template>