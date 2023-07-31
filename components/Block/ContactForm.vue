<script setup>
import emailjs from '@emailjs/browser'
import { storeToRefs } from 'pinia';
import { useViewportStore } from '~/stores/viewport'

const blockRef = ref(null)
const formRef = ref(null)
const formEl = computed(() => formRef.value.querySelector('#contact-form'))

const viewport = useViewportStore()
const { scrollTopPadding } = storeToRefs(viewport)

const { public: config } = useRuntimeConfig()

const serviceID = config.EMAILJS_SERVICE_ID
const templateID = config.EMAILJS_TEMPLATE_ID
const publicKey = config.EMAILJS_PUBLIC_KEY

const isSubmmitted = ref(false)
const isSuccess = ref(false)
const isFailure = ref(false)

const formSubmitting = computed(() => isSubmmitted.value && !isSuccess.value && !isFailure.value)
const formSubmitted = computed(() => isSubmmitted.value && (isSuccess.value || isFailure.value))

const placeholdersOptions = [
    {
        name: 'Amos Burton',
        email: 'amos@rocinante.io',
    },
    {
        name: 'Naomi Nagata',
        email: 'xo@rocinante.io',
    },
    {
        name: 'James Holden',
        email: 'holden@rocinante.io',
    },
    {
        name: 'Alex Kamal',
        email: 'mariner.valley@rocinante.io',
    },
    {
        name: 'Bobbie Draper',
        email: 'draper@rocinante.io',
    },
    {
        name: 'Hober Mallow',
        email: 'hober@smyrno.io',
    },
    {
        name: 'Salvor Hardin',
        email: 'warden@terminus.org',
    },
    {
        name: 'Gaal Dornick',
        email: 'gaal@synnax.io',
    },
    {
        name: 'Hari Seldon',
        email: 'psychohistory@foundation.org',
    },
    {
        name: 'Cleon XIII',
        email: 'empire@empire.empire',
    },
    {
        name: 'Liet Kynes',
        email: 'judgeofchange@arrakis.gov',
    },
    {
        name: 'Paul Atreides',
        email: 'mauddib@houseatredies.io',
    },
    {
        name: 'Duncan Idaho',
        email: 'idaho@houseatredies.io',
    },
    {
        name: 'Gurney Halleck',
        email: 'warmaster@houseatredies.io',
    },

]

const placeholder = computed(() => {
    return placeholdersOptions[Math.floor(Math.random() * placeholdersOptions.length)]
})

const onSubmit = (data) => {
    isSubmmitted.value = true
    emailjs.sendForm(serviceID, templateID, formEl.value, publicKey)
        .then((result) => {
            isSuccess.value = true
        }, (error) => {
            isFailure.value = true
        }
    )
}

watch(formSubmitted, (value) => {
    if (value) {
        useState('lenis').value.scrollTo(
            blockRef.value,
            { offset: scrollTopPadding.value * -1 }
        )
    }
})

</script>

<template>
    <section
        class="section form-block"
        section-theme="light"
        ref="blockRef"
    >
        <h2
            v-if="!formSubmitted"
            class="section__heading form-block__heading"
            heading-size="h4"
        >
            <TextMotion
                text="We'd love to hear from you."
                exit
                :stagger="0.035"
                :duration="0.5"
                :inview="0.95"
                transition-type="letter"
                :transition-name="['slide-left', 'slide-right']"
            />
        </h2>
        <div class="section__content form-block__content" ref="formRef" v-if="!formSubmitted">
            <FormKit
                type="form"
                @submit="onSubmit"
                :actions="false"
                #default="{ disabled }"
                :classes="{
                    form: 'form-block__form',
                }"
                id="contact-form"
            >
                <FormKit
                    type="text"
                    name="name"
                    id="name"
                    label="Name"
                    validation="required"
                    :placeholder="placeholder.name"
                />
                <FormKit
                    type="email"
                    name="email"
                    id="email"
                    label="Email"
                    validation="required|email"
                    :placeholder="placeholder.email"
                />
                <FormKit
                    type="textarea"
                    name="message"
                    id="message"
                    label="Message"
                    placeholder="Share your thoughts..."
                    rows="2"
                    cols="10"
                    data-lenis-prevent
                />
                <FormKit
                    type="text"
                    name="honey"
                    id="honeypot"
                    label="What's your favorite honey?"
                    autocomplete="off"
                    validation="length:0,0"
                    :classes="{
                        outer: 'form-block__honeypot sr-only',
                    }"
                    tabindex="-1"
                />
                <Button
                    type="submit"
                    :disabled="formSubmitting"
                    :text="formSubmitting ? 'Sending...' : 'Send Message'"
                    class="section__button form-block__button"
                    theme="dark"
                    icon="arrow-right"
                />

            </FormKit>
        </div>
        <div class="section__content form-block__content" v-else-if="formSubmitted">
            <div class="form-block__message form-block-message--success" v-if="isSuccess">
                <h3 class="section__heading form-block__message-heading" heading-size="h4">
                    <TextMotion
                        text="Thanks for reaching out!"
                        exit
                        :stagger="0.035"
                        :duration="0.5"
                        :inview="0.95"
                        transition-type="letter"
                        :transition-name="['slide-left', 'slide-right']"
                    />
                </h3>
                <p class="form-block__message-text rich-text">
                    Your message has been sent. We'll get back to you as soon as possible.
                </p>
            </div>
            <div class="form-block__message form-block-message--failure" v-else-if="isFailure">
                <h3 class="section__heading form-block__message-heading" heading-size="h3">
                    <TextMotion
                        text="Uh oh!"
                        exit
                        :stagger="0.035"
                        :duration="0.5"
                        :inview="0.95"
                        transition-type="letter"
                        :transition-name="['slide-left', 'slide-right']"
                    />
                </h3>
                <p class="form-block__message-text rich-text">
                    Something went very wrong.
                </p>
                <p class="form-block__message-text rich-text">
                    Why not try us at <a href="mailto:hello@timspears.io" target="_blank">hello@timspears.io</a> instead.
                </p>
            </div>
        </div>
    </section>
</template>