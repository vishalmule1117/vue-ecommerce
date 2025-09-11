<template>
    <div class="container min-h-screen mx-auto py-10 page-center p-4">
        <div>
            <!-- Empty Cart -->
            <div class="empty-basket" v-if="cartItems.length == 0">
                <h1 class="text-3xl mb-8 w-full basis-full">Basket</h1>
                <p class="mb-8">Your basket is empty.</p>

                <NuxtLink to="/shop"
                    class="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transform transition">
                    Continue Shopping
                </NuxtLink>
            </div>

            <!-- Cart Layout -->
            <div class="w-full flex justify-between items-start flex-wrap">
                <h1 class="text-3xl mb-2 w-full basis-full" v-if="cartItems.length">
                    Basket
                </h1>

                <!-- 🟢 LEFT: Cart Items List (70% when summary visible, else 100%) -->
                <div :class="cartItems.length ? 'w-full md:w-7/12 mr-8' : 'w-full'" class="flex-1">
                    <div class="flex justify-end mb-4" v-if="cartItems.length">
                        <span
                            class="cursor-pointer text-sm text-red-500 w-auto py-2 px-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transform transition"
                            @click="clearCart">
                            Clear All
                        </span>
                    </div>

                    <div v-for="(item, index) in cartItems" :key="index"
                        class="flex items-start space-x-3 flex-wrap bg-white shadow-sm rounded-2xl p-4 mb-4">
                        <img :src="item.images[0]" alt="" class="w-16 h-16 rounded object-cover" />
                        <div class="flex-1">
                            <p class="font-medium text-base font-semibold">{{ item.title }}</p>
                            <p class="text-md text-gray-black font-semibold">{{ item.price }}</p>
                        </div>
                        <div class="cursor-pointer" @click="removeFromCart(item._id)">
                            <Icon name="uil:trash-alt" style="color: black; font-size:20px;" />
                        </div>
                    </div>
                </div>

                <!-- 🟢 RIGHT: Order Summary (30%) -->
                <div class="order-summary w-full md:w-5/12 flex justify-end" v-if="cartItems.length">
                    <div class="max-w-md bg-white shadow-lg rounded-2xl p-6 w-full">
                        <h2 class="text-xl font-semibold text-gray-800 mb-4">
                            Order Summary
                        </h2>

                        <!-- Total -->
                        <div class="flex justify-between text-lg font-semibold text-gray-900">
                            <span>Total</span>
                            <span>$45.00</span>
                        </div>

                        <!-- Checkout Button -->
                        <button
                            class="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transform transition">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartDrawer, useCartItems } from "../composables/useCartDrawer";
const cartDrawer = useCartDrawer();
const { items: cartItems, removeFromCart, clearCart } = useCartItems();

useHead({
    bodyAttrs: {
        class: 'grey-fill'
    }
})

const closeDrawer = () => {
    cartDrawer.value = false;
};
</script>

<style>
.grey-fill {
    background-color: #eee;
}
</style>