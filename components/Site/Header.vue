<template>
    <header class="site-header">
        <IconLogo :title="data.siteTitle" />
        <div class="site-eyebrow">
            {{  data.siteEyebrow }}
        </div>
        <IconMenu />
    </header>
</template>

<script setup>
import { useGlobalData } from '../../data/global'
const { data } = useGlobalData()
</script>