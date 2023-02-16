<template>
  <div>
    <ul>
      <li v-for="nav in data.navigation" :key="nav.slug">
        <a :href="`/${nav.slug}`">{{ nav.title }}</a>
      </li>
    </ul>
  </div>
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
