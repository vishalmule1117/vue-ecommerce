import { ref, computed, onMounted } from "vue";

// ① export a function named `useAuth` so Nuxt auto-imports if needed
export function useAuth() {
  const config = useRuntimeConfig();

  // ② Use Nuxt's useState for SSR-friendly shared state
  const token = useState("auth_token", () => null);
  const user = useState("auth_user", () => null);

  // ③ computed convenience
  const isLoggedIn = computed(() => !!token.value);

  onMounted(async () => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      token.value = savedToken;
      try {
        const me = await $fetch(`${config.public.apiBase}/auth/me`, {
          headers: { Authorization: `Bearer ${savedToken}` },
        });
        user.value = me;
        console.log("Fetched user:", user.value);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
        user.value = null;
      }
    }
  });

  // ④ Save token + optional user data
  async function login(newToken, userData = null) {
    token.value = newToken;
    localStorage.setItem("token", newToken);
    if (userData) user.value = userData;
  }

  // ⑤ Logout: call server to blacklist (optional) then clear local state
  async function logout({ callServer = true } = {}) {
    const currentToken = token.value;

    if (callServer && currentToken) {
      try {
        await $fetch(
          "https://node-rest-api-ecommerce.onrender.com/api/auth/logout",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${currentToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        // don't block client logout on server fail — just warn
        console.warn("Logout API failed:", err);
      }
    }

    // clear client state
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
  }

  // ⑥ helper to add Authorization header on requests
  function getAuthHeader() {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {};
  }

  return { token, user, isLoggedIn, login, logout, getAuthHeader };
}
