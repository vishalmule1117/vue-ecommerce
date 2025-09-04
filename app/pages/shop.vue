<template>
    <div class="container mx-auto py-10 page-center">
        <div class="flex justify-end my-8">
            <SortBy v-model="selectedSort" @update-sort="updateSort" />
        </div>
        <div class="flex flex-colmd:flex-row">
            <ProductCard :products="products" />
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const products = ref([]);
const sortOption = ref([]);
async function fetchProduct() {
    try {
        let url = "http://localhost:3002/api/products/"
        if (sortOption.value) {
            url += `?sort=${sortOption.value}`;
        }
        const res = await $fetch(url);
        products.value = res.productList;
    } catch (error) {
        console.log(error);
    }
}

function updateSort(value) {
    sortOption.value = value;
}

// watch for sort changes and auto-refresh
watch(sortOption, () => {
    fetchProduct();
});

// Load initial products
onMounted(fetchProduct)
</script>