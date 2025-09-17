<template>
    <div class="mt-20">
        <client-only>

            <div class="home-page-banner">
                <BannerSlider />
            </div>

            <div class="product-card-slider">
                <div v-if="!products.length" class="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 w-full">

                    <!-- Skeleton Loader (show when loading) -->
                    <div v-for="n in 4" :key="n" class="bg-white rounded-2xl shadow-md p-4 animate-pulse">
                        <div class="w-full h-60 bg-gray-200 rounded-lg"></div>
                        <div class="mt-3 h-4 bg-gray-200 rounded w-3/4"></div>
                        <div class="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
                        <div class="mt-2 h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>

                </div>
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
