<template>
    <div class="min-h-screen container mx-auto py-10">
        <!-- Breadcrumb -->
        <nav class="text-sm text-slate-500 mb-6 mt-10" aria-label="Breadcrumb">
            <ol class="flex gap-2 items-center">
                <li>
                    <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
                </li>
                <li>/</li>
                <li class="text-slate-700"> My Profile</li>
            </ol>
        </nav>

        <div v-if="!isLoggedIn"
            class="bg-white rounded-xl shadow-md p-6 min-h-screen p-6 w-fill flex items-center justify-center text-center flex-wrap">
            <div>
                <div class="w-full">PLEASE LOG IN</div>
                <div class="mt-5 mb-5 w-full">Login to view items in your wishlist.</div>

                <NuxtLink to="/login"
                    class="py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transform transition cursor-pointer">
                    Login</NuxtLink>

            </div>
        </div>
        <div class="flex" v-if="isLoggedIn">
            <div class="">
                <aside class="w-64 bg-white shadow-md pt-6 pb-6 py-0 hidden md:block">
                    <div class="px-4 py-2 ">
                        <span class="block mb-1"> Hello, {{ user?.name }}</span>

                        <span> A/C Number : {{ user?.accountNumber }}</span>
                    </div>
                    <nav class="space-y-4">
                        <button v-for="item in menuItems" :key="item.key" @click="activeTab = item.key"
                            :class="activeTab === item.key ? 'bg-blue-500 text-white' : 'text-slate-700 hover:bg-slate-100'"
                            class="w-full text-left px-4 py-2  transition cursor-pointer">
                            {{ item.label }}
                        </button>
                    </nav>
                </aside>
            </div>
            <main class="flex-1 p-6">
                <div class="bg-white rounded-xl shadow-md p-6">
                    <div class="flex justify-between">
                        <h2 class="text-2xl font-semibold mb-4">{{menuItems.find(item => item.key ===
                            activeTab)?.label}}
                        </h2>
                    </div>

                    <section v-if="activeTab === 'profile'">
                        <div v-if="isLoggedIn">
                            <div>
                                Your Name : {{ user?.name }}
                            </div>
                            <div>
                                Email Id : {{ user?.email }}
                            </div>
                        </div>
                    </section>
                    <section v-if="activeTab === 'favourite'">
                        <div v-if="favorites.length" class="grid grid-cols-2 md:grid-cols-3 gap-6 p-4 w-full">
                            <ProductCard v-for="item in favorites" :key="item._id" :item="item" showDelete
                                @remove="removeFromFev" />
                        </div>
                        <p v-else class="text-gray-500 text-center">No favorite products yet.</p>
                    </section>

                    <section v-if="activeTab === 'wishlist'">
                        <div v-if="wishlist.length === 0" class="text-gray-500 text-center">
                            Your wishlist is empty.
                        </div>

                        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-6 p-4 w-full">
                            <ProductCard v-for="item in wishlist" :key="item._id" :item="item" :productId="item._id"
                                :showDelete="true" @remove="removeFromWishlist" />
                        </div>
                    </section>


                </div>

            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from '../composables/useAuth';
import { useWishlist } from "../composables/useWishList";
import { NuxtLink } from "#components";

const route = useRoute()
const router = useRouter()
const { user, isLoggedIn } = useAuth();
const favorites = ref([]);
const { wishlist, removeFromWishlist } = useWishlist();

defineProps({
    item: {
        type: Object,
        required: true
    }
});

const activeTab = computed({
    get: () => route.query.tab || 'profile',
    set: (value) => {
        router.push({ query: { ...router.query, tab: value } })
    }
});

const menuItems = [
    { key: "profile", label: "Personal", href: '/account?tab=profile' },
    { key: 'favourite', label: "Favourite", href: '/account?tab=favourite' },
    { key: 'wishlist', label: "WishList", href: '/account?tab=wishlist' },
    { key: 'orders', label: "Orders", href: '/account?tab=orders' },
    { key: 'GiftCard', label: "Gift Card", href: '/account?tab=GiftCard' },
    { key: 'SaveAddress', label: "Save Address", href: '/account?tab=SaveAddress' },
    { key: 'ContactUs', label: "Contact Us", href: '/account?tab=ContactUs' },
]

onMounted(() => {
    const stored = JSON.parse(localStorage.getItem("fav_products") || "[]")
    favorites.value = stored;
    console.log(favorites.value)
});

function removeFromFev(productId) {
    favorites.value = favorites.value.filter(item => item._id !== productId);
    localStorage.setItem("fav_products", JSON.stringify(favorites.value));
}

</script>