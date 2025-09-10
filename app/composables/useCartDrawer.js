import { ref, onMounted, watch } from "vue";

// Close and open Cart Drawer
export const useCartDrawer = () => useState("cartDrawer", () => false);

// Cart item state
export const useCartItems = () => {
  const items = useState("cartItems", () => []);

  // Restore cart item from localStorage on client load

  onMounted(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      try {
        items.value = JSON.parse(savedCartItems);
      } catch {
        items.value = [];
      }
    }
  });

  // Save Cart to localStorage when it changes
  watch(
    items,
    (newVal) => {
      localStorage.setItem("cartItems", JSON.stringify(newVal));
    },
    { deep: true }
  );

  // Add product no duplicate product add again
  function addToCart(product) {
    const exits = items.value.find((item) => item._id === product._id);
    if (!exits) {
      items.value.push(product);
    }
  }

  // remove signle product by ID
  function removeFromCart(productID) {
    items.value = items.value.filter((item) => item._id !== productID);
  }

  return { items, removeFromCart, addToCart };
};
