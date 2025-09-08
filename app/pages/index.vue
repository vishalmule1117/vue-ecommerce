<template>
    <div class="mt-16">
        <client-only>
            <SlickSlider />

            <div class="product-card-slider">
                <div v-if="!products.length" class="text-center py-8">Loading products...</div>
                <div v-else>
                    <ProductCardSlider :products="products" />
                </div>

                <div v-if="!products.length && error" class="text-red-500 py-8">
                    Failed to load products.
                </div>
            </div>
        </client-only>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const products = ref([]);
const error = ref(false);


// Fetch products from API
onMounted(async () => {
    try {
        const response = await axios.get('https://node-rest-api-ecommerce.onrender.com/api/products/')
        products.value = response.data.productList || [];
        console.log(products.value)
    } catch (err) {
        console.error('Failed to fetch products', err);
        error.value = true;
    }
})
</script>
