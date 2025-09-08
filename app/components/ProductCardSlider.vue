<template>
    <Carousel v-bind="config">
        <Slide v-for="product in products" :key="product._id">
            <div class="p-4 ProductSlider">
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
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { ref, onMounted } from 'vue'
const config = {
    snapAlign: 'center',
    autoplay: 0,
    wrapAround: 5000,
    breakpoints: {
        1024: { itemsToShow: 5 },
        460: { itemsToShow: 1.5, gap: 5 }
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
