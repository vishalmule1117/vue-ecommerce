<template>
    <header class="backdrop-blur-md bg-white/40 border-b border-white/20 shadow-lg fixed top-0 w-full z-50">
        <div class="container mx-auto flex items-center justify-between p-4">
            <!-- Logo -->
            <NuxtLink to="/" class="text-2xl font-bold text-indigo-600 drop-shadow-sm">
                Ecommerce
            </NuxtLink>

            <!-- Desktop Nav -->
            <nav class="hidden md:flex space-x-6">
                <NuxtLink v-for="link in navLinks" :key="link.name" :to="link.href"
                    class="text-gray-800 hover:text-indigo-600 transition font-medium">
                    {{ link.name }}
                </NuxtLink>
            </nav>

            <!-- Mobile Hamburger -->
            <button @click="isOpen = !isOpen" class="md:hidden flex flex-col space-y-1 focus:outline-none">
                <span class="block h-0.5 w-6 bg-gray-800 transition" :class="{ 'rotate-45 translate-y-1.5': isOpen }" />
                <span class="block h-0.5 w-6 bg-gray-800 transition" :class="{ 'opacity-0': isOpen }" />
                <span class="block h-0.5 w-6 bg-gray-800 transition"
                    :class="{ '-rotate-45 -translate-y-1.5': isOpen }" />
            </button>
        </div>

        <!-- Mobile Menu -->
        <transition name="slide">
            <div v-if="isOpen" class="md:hidden backdrop-blur-md bg-white/60 border-t border-white/20 shadow-lg">
                <nav class="flex flex-col p-4 space-y-4">
                    <NuxtLink v-for="link in navLinks" :key="link.name" :to="link.href"
                        class="text-gray-800 hover:text-indigo-600 transition font-medium" @click="isOpen = false">
                        {{ link.name }}
                    </NuxtLink>
                </nav>
            </div>
        </transition>
    </header>
</template>

<script setup>
import { ref } from "vue";
const isOpen = ref(false);
const route = useRoute()

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Basket", href: "/basket" },
    { name: "Login / SignUp", href: "/Login" },
    { name: "", href: "/signup" },
];
</script>

<style>
/* Mobile menu transition */
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>