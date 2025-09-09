<template>
    <Carousel v-bind="config">
        <Slide v-for="image in images" :key="image.id">
            <img :src="image.url" alt="image" />
        </Slide>

        <template #addons>
            <Pagination />
        </template>
    </Carousel>
</template>
<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination } from 'vue3-carousel'

const images = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
    url: `/images/banner-${index + 1}.jpg`,
}))

const config = {
    itemsToShow: 1,
    gap: 5,
    autoplay: 0,
    wrapAround: true,
}
</script>
