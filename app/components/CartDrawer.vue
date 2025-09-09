<template>
    <div>
        <div v-if="cartDrawer" class="fixed inset-0 bg-black/50 z-40" @click="closeDrawer"></div>

        <!-- Drawer -->
        <div class="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300"
            :class="cartDrawer ? 'translate-x-0' : 'translate-x-full'">
            <div class="p-4 flex justify-between items-center border-b">
                <h2 class="text-lg font-bold">Your Cart</h2>
                <button @click="closeDrawer" class="text-gray-500 hover:text-black">✕</button>
            </div>
        </div>
    </div>

</template>

<script setup>
import { useCartDrawer } from '../composables/useCartDrawer';
const cartDrawer = useCartDrawer()

const closeDrawer = () => {
    cartDrawer.value = false;
}
</script>