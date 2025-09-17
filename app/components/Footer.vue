<template>
    <footer class="backdrop-blur-lg bg-black text-white border-t border-white/20 text-gray-200 py-10 w-full">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

            <!-- Brand / About -->
            <div>
                <h2 class="text-xl font-semibold text-white mb-4">Ecommerce</h2>
                <p class="text-sm leading-relaxed text-gray-300">
                    Building modern web experiences with Nuxt.js, Node, Express, MongoDB
                </p>
            </div>

            <!-- Quick Links -->
            <div>
                <h2 class="text-lg font-semibold text-white mb-4">Quick Links</h2>
                <ul class="space-y-2">
                    <li>
                        <NuxtLink to="" class="hover:text-white transition">Home</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="" class="hover:text-white transition">About</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="" class="hover:text-white transition">Services</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="" class="hover:text-white transition">Contact</NuxtLink>
                    </li>
                </ul>
            </div>

            <!-- Resources -->
            <div>
                <h2 class="text-lg font-semibold text-white mb-4">Resources</h2>
                <ul class="space-y-2">
                    <li>
                        <NuxtLink to="" class="hover:text-white transition">Blog</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="" class="hover:text-white transition">FAQ</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="" class="hover:text-white transition">Privacy Policy</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="" class="hover:text-white transition">Terms & Conditions</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-white/10 mt-8 pt-6 text-center text-sm text-gray-300">
            © {{ new Date().getFullYear() }} MyBrand. All rights reserved.
        </div>

    </footer>
</template>

<script setup>
import { ref } from 'vue'

</script>