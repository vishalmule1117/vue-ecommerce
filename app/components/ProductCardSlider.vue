<template>
    <Carousel v-bind="config">
        <Slide v-for="product in products" :key="product._id">
            <ProductCard :products="products" />
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
import { ref, onMounted } from 'vue'
const config = {
    itemsToShow: 1,
    snapAlign: 'center',
    autoplay: 5000,
    wrapAround: false,
    gap: 10,
    breakpoints: {
        1024: { itemsToShow: 1 },
        768: { itemsToShow: 2 },
        480: { itemsToShow: 1 }
    }
}

// Props: accept full product array from parent
defineProps({
    products: {
        type: Array,
        required: true,
    }
})

</script>
