<template>
    <div class="min-h-screen container mx-auto py-10">
        <div class="flex justify-end my-8">
            <SortBy v-model="sortOption" />
        </div>
        <div v-if="pending" class="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
            <!-- Skeleton Loader (show when loading) -->
            <div v-for="n in 8" :key="n" class="bg-white rounded-2xl shadow-md p-4 animate-pulse">
                <div class="w-full h-60 bg-gray-200 rounded-lg"></div>
                <div class="mt-3 h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
                <div class="mt-2 h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
        </div>
        <div v-else class="flex flex-colmd:flex-row">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
                <div v-for="product in products" :key="product._id">
                    <ProductCard :item="product" :productId="product._id || product.id" />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
const products = ref([]);
const sortOption = ref("");
const pending = ref(false);

async function fetchProduct() {
    try {
        pending.value = true;
        let url = "https://node-rest-api-ecommerce.onrender.com/api/products/";
        // let url = "http://localhost:3002/api/products/"

        if (sortOption.value) {
            url += `?sort=${sortOption.value}`;
        }
        const res = await $fetch(url);

        products.value = res.productList;
    } catch (error) {
        console.log(error);
    } finally {
        // hide loader after fetch
        pending.value = false;
    }
}


// watch for sort changes and auto-refresh
watch(sortOption, () => {
    fetchProduct();
});

// Load initial products
onMounted(fetchProduct)
</script>