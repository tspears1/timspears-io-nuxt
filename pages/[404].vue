<script setup>

const router = useRouter()

</script>
<template>
    <main class="page-wrapper">
        <Hero
            eyebrow="Page Not Found"
            title="404"
            :compressed="true"
        />
        <section class="section text-block" section-theme="light">
            <div class="section__content text-block__content rich-text" style="display: grid; gap: 2rem;">
                <p>Sorry, the page you are looking for does not exist.</p>
                <Button
                    text="Head Back"
                    @click="router.back()"
                    theme="dark"
                    icon="arrow-right"
                />
            </div>
        </section>
    </main>
</template>