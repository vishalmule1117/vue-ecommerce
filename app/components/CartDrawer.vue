<template>
    <div>
        <div v-if="cartDrawer" class="fixed inset-0 bg-black/50 z-40" @click="closeDrawer"></div>

        <!-- Drawer -->
        <div class="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300"
            :class="cartDrawer ? 'translate-x-0' : 'translate-x-full'">
            <div class="p-4 flex justify-between items-center border-b">
                <h2 class="text-lg font-bold">Your Cart</h2>
                <button @click="closeDrawer" class="text-gray-500 hover:text-black cursor-pointer">✕</button>
            </div>
            <div class="p-4 space-y-4 overflow-y-auto h-[calc(100%-60px)]">
                <div @click="clearCart">
                    <div v-if="cartItems.length" class="cursor-pointer text-red-500 text-right hover:text-red-700">Clear
                        All
                    </div>
                </div>
                <div v-if="cartItems.length == 0" class="text-gray-500">Cart is Empty</div>

                <div v-for="(item, index) in cartItems" :key="index" class="flex items-start space-x-3">
                    <img :src="item.images[0]" alt="" class="w-16 h-16 rounded object-cover">
                    <div class="flex-1">
                        <p class="font-medium  capitalize text-base font-semibold">{{ item.title }}</p>
                        <p class="text-sm text-gray-500">{{ item.price }}</p>
                    </div>
                    <div class="cursor-pointer" @click="removeFromCart(item._id)">
                        <Icon name="uil:trash-alt" style="color: black" />
                    </div>
                </div>

                <div class="router-page">
                    <NuxtLink to="/basket" @click="closeDrawer"
                        class="block mb-5 w-full py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transform transition text-center">
                        View Basket</NuxtLink>
                    <button @click="closeDrawer"
                        class="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transform transition">Continue
                        Shopping</button>
                </div>

            </div>

        </div>
    </div>

</template>

<script setup>
import { useCartDrawer, useCartItems } from '../composables/useCartDrawer';
const cartDrawer = useCartDrawer();
const { items: cartItems, removeFromCart, clearCart } = useCartItems();
const closeDrawer = () => {
    cartDrawer.value = false;
}
</script>