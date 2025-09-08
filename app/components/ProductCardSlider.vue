<template>
    <Carousel v-bind="config">
        <Slide v-for="product in products" :key="product._id">
            <div class="grid  gap-6 p-4">
                <ProductCard :item="product" />
            </div>
        </Slide>

        <template #addons>
            <Navigation />
        </template>
    </Carousel>
</template>
<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import { ref, onMounted } from 'vue'
const config = {
    itemsToShow: 5,
    snapAlign: 'center',
    autoplay: 0,
    wrapAround: 5000,
    gap: 10,
    breakpoints: {
        1024: { itemsToShow: 5 },
        768: { itemsToShow: 3 },
        480: { itemsToShow: 1 }
    }
}

// Props: accept full product array from parent
const props = defineProps({
    products: {
        type: Object,
        required: true,
    }
})

console.log(props.products)

</script>
