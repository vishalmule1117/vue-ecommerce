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

        <div class="flex">
            <div class="">
                <aside class="w-64 bg-white shadow-md pt-6 pb-6 py-0 hidden md:block">
                    <div class="px-4 py-2 ">
                        Hello , {{ user?.name }}
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

                    <section v-if="activeTab === 'personal'">
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
                </div>

            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { Icon } from "@iconify/vue";
import { useAuth } from '../composables/useAuth'
const { user, isLoggedIn } = useAuth();
const favorites = ref([]);
const activeTab = ref("personal");
const menuItems = [
    { key: "personal", label: "Personal Info" },
    { key: "favourite", label: "Favourite" },
    { key: "bank", label: "Your Bank Details" },
    { key: "orders", label: "Your Orders" },
    { key: "address", label: "Your Address" },
    { key: "change-password", label: "Change Password" },
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