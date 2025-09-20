import { ref, watch } from "vue";

// Initialize the `saved` variable by attempting to retrieve the wishlist from localStorage.
// If the data is invalid or not found, default to an empty array.
let saved;
try {
  saved = JSON.parse(localStorage.getItem("wishlist")) || [];
} catch {
  saved = [];
}

// `wishlist` is a reactive reference that holds the current state of the wishlist.
// It is initialized with the `saved` data from localStorage.
const wishlist = ref(saved);

// Watch the `wishlist` reactive reference for changes.
// Whenever the `wishlist` changes, the new value is saved to localStorage.
// The `deep: true` option ensures that nested changes in the array are also tracked.
watch(
  wishlist,
  (newVal) => {
    localStorage.setItem("wishlist", JSON.stringify(newVal));
  },
  { deep: true }
);

// Exported function to provide wishlist functionality.
export function useWishlist() {
  // Adds a product to the wishlist if it doesn't already exist.
  const addToWishlist = (product) => {
    if (!wishlist.value.find((p) => p._id === product._id)) {
      wishlist.value.push(product);
    }
  };

  // Removes a product from the wishlist by its ID.
  const removeFromWishlist = (productId) => {
    wishlist.value = wishlist.value.filter((p) => p._id !== productId);
  };

  // Toggles a product in the wishlist:
  // - If the product exists, it is removed.
  // - If the product does not exist, it is added.
  const toggleWishlist = (product) => {
    const exists = wishlist.value.find((p) => p._id === product._id);
    exists ? removeFromWishlist(product._id) : addToWishlist(product);
  };
  const isInWishlist = (productId) =>
    wishlist.value.some((p) => p._id === productId);

  // Return the wishlist and the functions to interact with it.
  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  };
}
