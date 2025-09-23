<template>
    <header class="backdrop-blur-md bg-white/40 border-b border-white/20 shadow-lg fixed top-0 w-full z-50">
        <div class="container mx-auto flex items-center justify-between p-4">
            <!-- Logo -->
            <NuxtLink to="/" class="text-2xl font-bold text-indigo-600 drop-shadow-sm">
                Ecommerce
            </NuxtLink>

            <div class="w-[80%] flex items-center justify-between">
                <!-- Desktop Nav -->
                <nav class="hidden md:flex space-x-6">
                    <ul class="md:flex space-x-6">
                        <li v-for="link in navLinks" :key="link.name">
                            <NuxtLink :to="link.href" class="hover:underline">
                                {{ link.name }}
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
                <div class="w-[50%] mx-auto">
                    <div class="relative">
                        <!-- Search Icon -->
                        <Icon icon="mdi:magnify" width="24" height="24"
                            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

                        <!-- Input Box -->
                        <input type="text" placeholder="Search..."
                            class="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                <div class="">
                    <div class="flex items-center justify-between flex-wrap">
                        <div
                            class="group relative hover:underline flex flex-wrap justify-center mr-4 text-base cursor-pointer hidden lg:block">
                            <Icon icon="mdi:user" width="24" height="24" class="w-full" />
                            Profile
                            <div
                                class="absolute top-14 left-0 mt-2 w-48 bg-white shadow-lg border rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50">
                                <ul class="flex flex-col divide-y divide-gray-200">
                                    <!-- Login / Sign Up -->
                                    <li v-if="!isLoggedIn">
                                        <NuxtLink to="/login"
                                            class="block px-4 py-2 hover:bg-gray-100 text-gray-700 font-medium">
                                            Login / Sign Up
                                        </NuxtLink>
                                    </li>

                                    <li v-for="link in profileLink" :key="link.name">
                                        <NuxtLink :to="link.href"
                                            class="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                                            {{ link.name }}
                                        </NuxtLink>
                                    </li>
                                    <li v-if="isLoggedIn">
                                        <NuxtLink to="/" class="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                                            @click="handleLogout">
                                            Logout
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <NuxtLink v-if="isLoggedIn" to="/account?tab=wishlist"
                            class="hover:underline flex flex-wrap justify-center text-base mr-4 hidden lg:block">
                            <Icon icon="mdi:cards-heart-outline" width="24" height="24" class="w-full" />
                            WishList
                        </NuxtLink>
                        <NuxtLink @click="openAuthModal" v-if="!isLoggedIn"
                            class="hover:underline flex flex-wrap justify-center text-base mr-4 hidden lg:block">
                            <Icon icon="mdi:cards-heart-outline" width="24" height="24" class="w-full" />
                            WishList
                        </NuxtLink>
                        <!-- <NuxtLink class="hover:underline flex flex-wrap justify-center text-base">
                            <Icon icon="mdi:cart" width="24" height="24" class=" w-full" />
                            Cart
                        </NuxtLink> -->
                    </div>
                </div>

            </div>

            <!-- Mobile Hamburger -->
            <button @click="isOpen = !isOpen"
                class="md:hidden flex flex-col space-y-1 focus:outline-none cursor-pointer">
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
                    <NuxtLink v-for="link in profileLink" :to="link.href" :key="link.name" @click="isOpen = false"
                        class="text-gray-800 hover:text-indigo-600 transition font-medium">
                        {{ link.name }}
                    </NuxtLink>
                    <NuxtLink v-if="isLoggedIn" to="/"
                        class="text-gray-800 hover:text-indigo-600 transition font-medium" @click="handleLogout()">
                        <span>Logout</span>
                    </NuxtLink>
                </nav>
            </div>
        </transition>
    </header>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth';
import { useAuthModal } from '../composables/useAuthModal';
import { NuxtLink } from "#components";
const isOpen = ref(false);
const router = useRouter();
const authModal = useAuthModal()
const { isLoggedIn, logout } = useAuth();

// Short and clean navLinks — only the last item swaps
const navLinks = computed(() => [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Basket', href: '/basket' }
]);

const profileLink = computed(() => [
    ...(isLoggedIn.value ? [{ name: 'Profile', href: '/account?tab=profile' }] : []),
    { name: 'Favourite', href: '/account?tab=favourite' },
    { name: 'WishList', href: '/account?tab=wishlist' },
    { name: 'Orders', href: '/account?tab=orders' },
    { name: 'Gift Card', href: '/account?tab=GiftCard' },
    { name: 'Save Address', href: '/account?tab=SaveAddress' },
    { name: 'Contact Us', href: '/account?tab=ContactUs' },
])

const handleLogout = async () => {
    await logout({ callServer: true })
    router.push('/')
}
const openAuthModal = () => {
    authModal.value = true
}
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