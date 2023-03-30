<script setup>
import { list } from 'radash';


const galleryList = ref(list(1, 10))

</script>

<template>
    <section class="gallery-block">
        <div class="gallery-block__wrapper">
            <div class="gallery-block__gallery">
                <ul class="gallery-block__gallery-track">
                    <li
                        v-for="(n, index) in galleryList.length"
                        :key="`${index}-gallery-item`"
                        class="gallery-block__gallery-item"
                    >

                    </li>
                </ul>
            </div>
            <nav class="gallery-block__navigation">
                <ul class="gallery-block__navigation-track">
                    <li
                        v-for="(n, index) in galleryList.length"
                        :key="`${index}-gallery-navigation-item`"
                        class="gallery-block__navigation-item"
                    >

                    </li>
                </ul>
            </nav>
        </div>
    </section>
</template>