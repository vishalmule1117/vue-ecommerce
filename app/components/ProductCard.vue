<template>
    <!-- Product Card -->
    <div class="bg-white rounded-2xl shadow-md p-4 relative">
        <NuxtLink :to="`/product-details?id=${validItemId}&?name=${item.title}`">
            <img :src="item.images?.[0]" :alt="item.title || 'Product'" class="w-full md:h-60 object-cover rounded-lg">
        </NuxtLink>
        <!-- Only show favorite button if we have a valid ID -->
        <div v-if="validItemId" class="absolute top-4 right-4" @click="toggleFav"
            :class="isFav ? 'favourite-on' : 'favourite-off'">
            <Icon :icon="isFav ? 'mdi:heart' : 'mdi:heart-outline'" class="cursor-pointer transition-all duration-200"
                :class="isFav ? 'text-red-500' : 'text-gray-400 hover:text-red-400'" style="font-size: 24px;" />
        </div>

        <div v-if="showDelete" @click="$emit('remove', item._id)"
            class="absolute top-2 right-2 bg-white rounded-full p-1 shadow group cursor-pointer">
            <Icon icon="mdi:delete" width="24" height="24" />
        </div>

        <NuxtLink :to="`/product-details?id=${validItemId}&?name=${item.title}`">
            <span class="text-gray-400 py-3 uppercase text-xs h-10 block">{{ item.brand }}</span>

            <h3 class="text-lg font-bold text-black truncate capitalize h-[35px]">{{ item.title || 'No Title' }}</h3>
        </NuxtLink>

        <div class="flex items-center">
            <p class="text-lg font-semibold text-black">${{ item.price }}</p>
            <div class="ml-auto">
                <button @click="openAuthModal" v-if="!isLoggedIn"
                    class="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                        class="bi bi-bag-plus text-black hover:text-green-600 transition-colors" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                        <path
                            d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                </button>

                <button @click="handleAddToCart(item)" v-else
                    class="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                        class="bi bi-bag-plus text-black hover:text-green-600 transition-colors" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                        <path
                            d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { toast } from "vue3-toastify"
import { useAuth } from '../composables/useAuth'
import { useAuthModal } from '../composables/useAuthModal'
import { useCartDrawer, useCartItems } from '../composables/useCartDrawer'
import { NuxtLink } from "#components"
import { Icon } from "@iconify/vue";

const { isLoggedIn } = useAuth()
const isFav = ref(false)

const authModal = useAuthModal()
const cartDrawer = useCartDrawer()
const { addToCart } = useCartItems()

const props = defineProps({
    item: { type: Object, required: true },
    productId: { type: [String, Number], required: true },
    persistKey: { type: String, default: "fav_products" },
    showDelete: { type: Boolean, default: false }
})
const emit = defineEmits(["remove"])
//BULLETPROOF ID resolution
const validItemId = computed(() => {
    const candidates = [
        props.productId,
        props.item?._id,
        props.item?.id
    ]

    for (const candidate of candidates) {
        if (candidate !== null && candidate !== undefined && candidate !== '') {
            const stringId = String(candidate).trim()
            if (stringId && stringId !== 'undefined' && stringId !== 'null') {
                return stringId
            }
        }
    }

    return null
})

// ✅ COMPLETE PRODUCT DATA - Save full product details, not just IDs
function getLocalFavs() {
    try {
        const stored = localStorage.getItem(props.persistKey)
        if (!stored) return []

        const parsed = JSON.parse(stored)
        if (!Array.isArray(parsed)) return []

        // Handle both old format (just IDs) and new format (full products)
        const cleaned = parsed.filter(item => {
            if (typeof item === 'string') {
                // Old format: just ID strings
                return item !== 'undefined' && item !== 'null' && item.trim() !== ''
            } else if (typeof item === 'object' && item !== null) {
                // New format: full product objects
                const id = item._id || item.id
                return id && String(id) !== 'undefined' && String(id) !== 'null'
            }
            return false
        })

        return cleaned
    } catch (error) {
        console.warn('Error reading favorites from localStorage:', error)
        return []
    }
}

function setLocalFavs(favs) {
    try {
        if (!Array.isArray(favs)) {
            console.error('❌ Invalid favs array:', favs)
            return false
        }

        localStorage.setItem(props.persistKey, JSON.stringify(favs))
        return true
    } catch (error) {
        console.error('Error saving favorites to localStorage:', error)
        return false
    }
}

// ✅ CHECK IF PRODUCT IS FAVORITED (works with both old and new format)
function isProductFavorited(productId) {
    const favs = getLocalFavs()

    return favs.some(item => {
        if (typeof item === 'string') {
            // Old format: just ID
            return item === productId
        } else if (typeof item === 'object' && item !== null) {
            // New format: full product object
            const id = item._id || item.id
            return String(id) === String(productId)
        }
        return false
    })
}

// ✅ CREATE CLEAN PRODUCT OBJECT for storage
const createFavoriteProduct = computed(() => {
    if (!props.item || !validItemId.value) return null

    return {
        _id: validItemId.value,
        id: validItemId.value, // Backup ID
        title: props.item.title || '',
        price: props.item.price || 0,
        brand: props.item.brand || '',
        images: props.item.images || [],
        category: props.item.category || '',
        // Add any other fields you need
        dateAdded: new Date().toISOString() // Track when it was favorited
    }
})

onMounted(() => {
    if (!validItemId.value) {
        console.warn('⚠️ No valid ID found for favorite functionality', {
            productId: props.productId,
            itemId: props.item?._id,
            itemIdAlt: props.item?.id,
            item: props.item
        })
        return
    }

    // Check if this product is already favorited
    isFav.value = isProductFavorited(validItemId.value)
})

const openAuthModal = () => {
    authModal.value = true
}

const handleAddToCart = (item) => {
    if (!item) {
        toast.error("❌ Invalid item")
        return
    }
    try {
        cartDrawer.value = true;
        const added = addToCart(item);
        if (added) {
            toast.success("🛒 Added to cart!", {
                autoClose: 1500,
                position: toast.POSITION.BOTTOM_CENTER,
            })
        }
    } catch (error) {
        console.error('Error adding to cart:', error)
        toast.error("❌ Failed to add to cart")
    }
}

// ✅ ENHANCED toggleFav - Saves COMPLETE product data
const toggleFav = () => {
    if (!validItemId.value || !createFavoriteProduct.value) {
        console.error('❌ Cannot toggle favorite: Invalid product data')
        toast.error("❌ Unable to favorite this item")
        return
    }

    const currentFavs = getLocalFavs()

    let newFavs;

    if (isFav.value) {
        // REMOVE from favorites - filter out by ID
        newFavs = currentFavs.filter(item => {
            if (typeof item === 'string') {
                return item !== validItemId.value
            } else if (typeof item === 'object' && item !== null) {
                const id = item._id || item.id
                return String(id) !== validItemId.value
            }
            return false
        })

        if (setLocalFavs(newFavs)) {
            isFav.value = false
            toast.info("💔 Removed from favorites", {
                autoClose: 1500,
                position: toast.POSITION.BOTTOM_CENTER,
            })
        } else {
            toast.error("❌ Failed to remove from favorites")
        }

    } else {
        // ADD to favorites - save COMPLETE product object
        const isAlreadyFavorited = currentFavs.some(item => {
            if (typeof item === 'string') {
                return item === validItemId.value
            } else if (typeof item === 'object' && item !== null) {
                const id = item._id || item.id
                return String(id) === validItemId.value
            }
            return false
        })

        if (!isAlreadyFavorited) {
            newFavs = [...currentFavs, createFavoriteProduct.value]
        } else {
            newFavs = currentFavs
        }

        if (setLocalFavs(newFavs)) {
            isFav.value = true
            toast.success(`❤️ Added "${props.item.title}" to favorites`, {
                autoClose: 1000,
                position: toast.POSITION.BOTTOM_CENTER,
            })
        } else {
            toast.error("❌ Failed to add to favorites")
        }
    }
}

// 🔍 UTILITY: Get all favorite products with full details
const getAllFavoriteProducts = () => {
    return getLocalFavs().filter(item => typeof item === 'object' && item !== null)
}
</script>

<style scoped>
.favourite-on {
    transform: scale(1.1);
    filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.3));
}

.favourite-off {
    transform: scale(1);
}

.favourite-on,
.favourite-off {
    transition: all 0.2s ease-in-out;
}
</style>