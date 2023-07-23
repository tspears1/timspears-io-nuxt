<script setup>

</script>
<template>
    <footer class="site-footer">
        <div class="site-footer__accent">
            <div class="site-footer__gradient" />
            <div class="site-footer__gradient" style="opacity: 0.9;" />
            <div class="site-footer__gradient" style="opacity: 0.8;" />
            <div class="site-footer__gradient" style="opacity: 0.7;" />
            <div class="site-footer__gradient" style="opacity: 0.6;" />
            <div class="site-footer__gradient" style="opacity: 0.5;" />
            <div class="site-footer__gradient" style="opacity: 0.4;" />
            <div class="site-footer__gradient" style="opacity: 0.3;" />
            <div class="site-footer__gradient" style="opacity: 0.2;" />
            <div class="site-footer__gradient" style="opacity: 0.1;" />
        </div>
        <div class="site-footer__grid">
            <div class="site-footer__meta">
                <span>&copy; {{ new Date().getFullYear() }} Tim Spears.</span>
                <span class="site-footer__tagline">Made with curiosity & love.</span>
            </div>
            <ThemePicker />
        </div>
    </footer>
</template>
