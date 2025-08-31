<template>
    <div class="flex flex-wrap">
        <div v-if="pending">Pending</div>
        <div v-else-if="error">Error: {{ error.message }}</div>
        <div v-else v-for="item in data.data.productList" :key="item.id"
            class="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 hover:shadow-xl duration-500 w-72">
            <!-- Image -->
            <a href="#">
                <img :src="item.images[0]" alt="Product image" class="h-80 w-72 object-cover" />
            </a>

            <!-- Content -->
            <div class="px-4 py-3">
                <!-- Brand -->
                <span class="text-gray-400 mr-3 uppercase text-xs">{{ item.brand }}</span>

                <!-- Product Name -->
                <p class="text-lg font-bold text-black truncate capitalize">
                    {{ item.title }}
                </p>

                <!-- Price + Cart -->
                <div class="flex items-center mt-3">
                    <p class="text-lg font-semibold text-black">$149</p>
                    <del class="ml-2 text-sm text-gray-600">$199</del>

                    <!-- Add to Cart -->
                    <div class="ml-auto">
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                class="bi bi-bag-plus text-black hover:text-green-600" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                <path
                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { data, pending, error } = await useFetch(
    "https://node-rest-api-ecommerce.onrender.com/api/products/",
    {
        server: true, // force client-side fetch
        retry: 3,      // retry if fails
        retryDelay: 2000 // wait 2s between retries
    }
);
console.log(data.value)
</script>