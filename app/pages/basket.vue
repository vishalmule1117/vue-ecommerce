<script setup lang="js">
import { NuxtLink } from '#components';

</script>

<template>
    <div class="container mx-auto flex items-center justify-between py-10 page-center">
        <div class="empty-basket">
            <h1 class="text-3xl">Basket</h1>
            <p class="mb-8">Your basket is empty.</p>

            <NuxtLink to="/shop"
                class="w-full  py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transform transition">
                Continue Shopping
            </NuxtLink>
        </div>
    </div>
</template>