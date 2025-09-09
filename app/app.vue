<template>
  <div>
    <Header />
    <HomePage />
    <Footer />

    <!-- Modal -->
    <div v-if="authModal"
      class="fixed inset-0 bg-black bg-opacity-50 bg-opacity-5 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-96 relative">
        <div class="flex ">
          <h2 class="text-xl font-semibold mb-4 text-center w-full">Please choose an option below</h2>
          <button @click="closeAuthModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            X
          </button>
        </div>

        <div class="flex justify-between">

          <a href="/login"
            class="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transform transition text-center mr-6">
            Log In
          </a>
          <a href="/signup"
            class="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transform transition text-center">
            Sign Up
          </a>
        </div>
      </div>
    </div>
    <CartDrawer />

  </div>
</template>
<script setup>
import "vue3-toastify/dist/index.css";
import HomePage from './layouts/HomePage.vue';

import { useAuthModal } from './composables/useAuthModal'
const authModal = useAuthModal() // MUST be inside setup
const tab = ref('login')

const closeAuthModal = () => {
  authModal.value = false;
}

</script>