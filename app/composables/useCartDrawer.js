import { ref, onMounted, watch } from "vue";
import { toast } from "vue3-toastify";

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
        items.value = JSON.parse(savedCartItems).map((item) => ({
          ...item,
          // Ensure quantity is at least 1
          quantity: item.quantity || 1,
        }));
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
      items.value.push({ ...product, quantity: 1 });
      return true;
    } else {
      toast.info("Product already in cart!", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  }

  //total count for badge
  const cartCount = computed(() =>
    items.value.reduce((total, item) => total + (item.quantity || 1), 0)
  );

  // remove signle product by ID
  function removeFromCart(productID) {
    items.value = items.value.filter((item) => item._id !== productID);
    localStorage.removeItem("cartItems");
  }

  //Clear all cart
  function clearCart() {
    items.value = [];
    localStorage.removeItem("cartItems");
  }

  // increase quantity
  const increaseQty = (id) => {
    const item = items.value.find((item) => item._id === id);
    if (item) {
      if (!item.quantity) {
        item.quantity = 1;
      }
      if (item.quantity < 5) {
        item.quantity++;
      } else {
        toast.error("Only 5 units allowed per product!", {
          position: "bottom-center",
          autoClose: 1000,
        });
      }
    }
  };

  // decreaseQty quantity
  const decreaseQty = (id) => {
    const item = items.value.find((item) => item._id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
    // else if (item && item.quantity === 1) {
    //   removeFromCart(id);
    // }
  };

  return {
    items,
    removeFromCart,
    addToCart,
    cartCount,
    clearCart,
    increaseQty,
    decreaseQty,
  };
};
