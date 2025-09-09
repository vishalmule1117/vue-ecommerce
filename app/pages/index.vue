<template>
    <div class="mt-16">
        <client-only>

            <div class="home-page-banner">
                <BannerSlider />
            </div>

            <div class="product-card-slider">
                <div v-if="!products.length" class="text-center py-8">Loading products...</div>
                <div v-else class="mt-8">
                    <h1 class="text-2xl font-bold text-center">Recommended for you</h1>
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
import BannerSlider from '~/components/BannerSlider.vue';
const products = ref([]);
const error = ref(false);
const showModal = ref(false);

// Fetch products from API
onMounted(async () => {
    try {
        const response = await axios.get('https://node-rest-api-ecommerce.onrender.com/api/products/')
        products.value = response.data.productList || [];
    } catch (err) {
        console.error('Failed to fetch products', err);
        error.value = true;
    }
})
</script>
