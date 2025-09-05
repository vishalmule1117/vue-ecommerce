<template>
    <div class="container mx-auto py-10">
        <div class="flex justify-end my-8">
            <SortBy v-model="sortOption" />
        </div>
        <div class="flex flex-colmd:flex-row">
            <div v-if="pending">Loading....</div>
            <ProductCard v-else :products="products" />
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
const products = ref([]);
const sortOption = ref("title");
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