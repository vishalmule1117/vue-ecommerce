<template>
    <div class="min-h-screen">
        <div class=" container mx-auto py-10">
            <!-- Breadcrumb -->
            <nav class="text-sm text-slate-500 mb-6 mt-10" aria-label="Breadcrumb">
                <ol class="flex gap-2 items-center">
                    <li>
                        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
                    </li>
                    <li>/</li>
                    <li>
                        <NuxtLink to="/" class="hover:underline">Category</NuxtLink>
                    </li>
                    <li>/</li>
                    <li class="text-slate-700">{{ product.title || "Product" }}</li>
                </ol>
            </nav>


            <div v-if="pending" class="text-center py-12">
                <div class="p-6 animate-pulse">
                    <!-- Image + Info Section -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Product Image Skeleton -->
                        <div class="w-full h-80 bg-gray-200 rounded-xl"></div>

                        <!-- Product Info Skeleton -->
                        <div class="space-y-4">
                            <!-- Title -->
                            <div class="h-6 bg-gray-200 rounded w-3/4"></div>
                            <!-- Price -->
                            <div class="h-5 bg-gray-200 rounded w-1/3"></div>
                            <!-- Rating -->
                            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                            <!-- Description -->
                            <div class="space-y-2">
                                <div class="h-4 bg-gray-200 rounded w-full"></div>
                                <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div class="h-4 bg-gray-200 rounded w-4/6"></div>
                            </div>
                            <!-- CTA Buttons -->
                            <div class="flex space-x-4 mt-4">
                                <div class="h-10 bg-gray-200 rounded w-32"></div>
                                <div class="h-10 bg-gray-200 rounded w-32"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="!product" class="text-center py-12">Product not found.</div>
            <section class="bg-white rounded-2xl shadow p-6 md:p-10" v-else>
                <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                    <div class="md:col-span-7">
                        <div class="flex flex-col md:flex-row md:gap-6">

                            <div class="flex-1 rounded-lg overflow-hidden border border-slate-200 bg-gray-50">
                                <img :src="product.images?.[0]" alt="Main product"
                                    class="w-full h-80 md:h-[420px] object-contain" />
                            </div>
                        </div>
                    </div>


                    <div class="md:col-span-5">
                        <p class="capitalize">{{ product.category }}</p>
                        <h1 class="text-2xl md:text-3xl font-semibold mb-2">{{ product.title }}</h1>

                        <div class="flex items-center gap-4 mb-4">
                            <div class="text-2xl md:text-3xl font-bold">₹ {{ product.price }}</div>
                            <!-- <div class="text-sm text-slate-500 line-through">₹3,499</div> -->
                            <div class="ml-auto text-sm text-green-600 font-medium">{{ product.discountPercentage }}%
                                OFF
                            </div>
                        </div>

                        <p class="text-slate-600 mb-6 leading-relaxed">{{ product.description }}</p>

                        <div class="flex gap-3 items-center mb-6">
                            <div v-if="quantity > 0" class="flex items-center border rounded-lg overflow-hidden">
                                <button class="px-3 py-2 text-lg cursor-pointer" aria-label="Decrease"
                                    @click="decreaseQty(product._id)">−</button>
                                <div class="px-4 py-2 font-medium">{{ quantity }}</div>
                                <button class="px-3 py-2 text-lg cursor-pointer" aria-label="Increase"
                                    @click="increaseQty(product._id)">+</button>
                            </div>
                            <NuxtLink else-if to="/basket" v-if="quantity > 0"
                                class="py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transform transition">
                                View Basket</NuxtLink>

                            <button v-else @click="addToCart(product)"
                                class="py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transform transition cursor-pointer">Add
                                to cart</button>
                        </div>

                        <div class="text-sm text-slate-500">
                            <p><strong>Delivery:</strong> Free delivery within 5–7 business days.</p>
                            <p class="mt-1"><strong>Return:</strong> 7-day easy returns.</p>
                        </div>

                        <div class="mt-6 border-t pt-6 text-sm text-slate-600">
                            <h3 class="font-semibold mb-2">Product details</h3>
                            <ul class="list-disc ml-5 space-y-1">
                                <li>Warranty: {{ product.warrantyInformation }}</li>
                                <li>Shipping Info: {{ product.shippingInformation }}</li>
                                <li>Availability : {{ product.availabilityStatus }}</li>
                                <li>Return: {{ product.returnPolicy }}</li>
                                <li>Order Quantity: {{ product.minimumOrderQuantity }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <section class="relative py-24 bg-[#B3E0F2] overflow-hidden">
            <!-- Background Pattern -->
            <div class="container mx-auto px-6 lg:px-12 text-center relative z-10">
                <!-- Section Title -->
                <h2 class="text-6xl font-extrabold text-[#5D8AA8] mb-12 tracking-wide leading-tight animate-fadeInUp">
                    Our Clients Love Us
                </h2>
                <p class="text-xl text-[#4F4F4F] opacity-90 mb-20 max-w-3xl mx-auto animate-fadeInUp"
                    style="animation-delay: 0.3s;">
                    Here's what our satisfied clients say about the difference we've made to their businesses.
                </p>

                <!-- Testimonials Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 animate-fadeInUp"
                    style="animation-delay: 0.6s;">
                    <div v-for="review in product.reviews" :key="review.reviewerEmail">
                        <Testimonial :review="review" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCartItems } from "../composables/useCartDrawer";
import Testimonial from "~/components/Testimonial.vue";
const route = useRoute();
const product = ref({});
const review = ref([]);
const pending = ref(false);
const { items, addToCart, increaseQty, decreaseQty } = useCartItems();

const quantity = computed(() => {
    const item = items.value.find(i => i._id === product.value._id);
    return item?.quantity || 0;
});

const fetchProduct = async () => {
    try {
        pending.value = true;
        const url = `https://node-rest-api-ecommerce.onrender.com/api/products/${route.query.id}`;
        const res = await fetch(url);

        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        //Assign directly since backend returns the product object
        product.value = data;
    } catch (error) {
        console.error("Error fetching product:", error);
    } finally {
        pending.value = false;
    }
}

onMounted(async () => {
    await fetchProduct()
});
</script>
