<template>
  <Html class="root" :data-theme="theme">
    <Body>
      <SiteSvgStore />
      <SiteWrapper>
        <SiteHeader />
        <!-- <DebugStylesheet /> -->
        <!-- <SiteMenu /> -->
      </SiteWrapper>
    </Body>
  </Html>
</template>

<script setup lang="ts">
const { theme } = useTheme()

</script>

