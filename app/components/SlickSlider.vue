<template>
    <Carousel v-bind="config">
        <Slide v-for="image in images" :key="image.id">
            <img :src="image.url" alt="image" />
        </Slide>

        <template #addons>
            <Navigation />
            <Pagination />
        </template>
    </Carousel>
</template>
<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const images = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
    url: `/images/banner-${index + 1}.jpg`,
}))

const config = {
    height: 400,
    itemsToShow: 1,
    gap: 5,
    autoplay: 2000,
    wrapAround: true,
}
</script>
