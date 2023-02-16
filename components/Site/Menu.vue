<template>
    <nav class="site-menu">

    </nav>
</template>

<script setup>
const { data } = useSanityQuery(groq`
  *[_type == "settings"]{
    siteEyebrow,
    siteTitle,
    navigation[] -> {
      title,
      "slug": slug.current
    }
  }[0]
`)

</script>