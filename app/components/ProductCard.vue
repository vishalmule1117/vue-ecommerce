<template>
    <!-- Product Card -->
    <div class="bg-white rounded-2xl shadow-md p-4" :key="item?.id">
        <img :src="item.images[0]" alt="Product" class="w-full md:-80 object-cover rounded-lg">
        <span class="text-gray-400 py-3 uppercase text-xs h-10 block">{{ item.brand }}</span>
        <h3 class="text-lg font-bold text-black truncate capitalize">{{ item.title }}</h3>
        <div class="flex">
            <p class="text-lg font-semibold text-black">${{ item.price }}</p>
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
</template>

<script setup>
const props = defineProps({
    item: {
        type: Array,
        required: true
    },
});

// console.log(props.item)
</script>