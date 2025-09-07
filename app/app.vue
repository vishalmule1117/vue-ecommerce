<template>
  <div>
    <Header />
    <HomePage />
    <Footer />

    <!-- Modal -->
    <div v-if="authModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="border border-white border-solid rounded-lg shadow-lg w-96 p-6 relative">
        <!-- Close Button -->
        <button @click="closeAuthModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          ✕
        </button>

        <!-- Tabs -->
        <div class="flex border-b mb-4">
          <button class="w-1/2 py-2 text-center"
            :class="tab === 'login' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'"
            @click="tab = 'login'">
            Login
          </button>
          <button class="w-1/2 py-2 text-center"
            :class="tab === 'signup' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'"
            @click="tab = 'signup'">
            Sign Up
          </button>
        </div>

        <!-- Login Form -->
        <div v-if="tab === 'login'">
          <h2 class="text-xl font-semibold mb-4">Login</h2>
          <div class="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form class="space-y-6" action="#" method="POST">
                <div>
                  <label for="email" class="block text-sm/6 font-medium text-gray-100">Email address</label>
                  <div class="mt-2">
                    <input type="email" name="email" id="email" autocomplete="email" required=""
                      class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm/6 font-medium text-gray-100">Password</label>
                    <div class="text-sm">
                      <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
                    </div>
                  </div>
                  <div class="mt-2">
                    <input type="password" name="password" id="password" autocomplete="current-password" required=""
                      class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                  </div>
                </div>

                <div>
                  <button type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign
                    in</button>
                </div>
              </form>

              <p class="mt-10 text-center text-sm/6 text-gray-400">
                Not a member?
                {{ ' ' }}
                <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Start a 14 day free trial</a>
              </p>
            </div>
          </div>
        </div>

        <!-- Signup Form -->
        <div v-else>
          <h2 class="text-xl font-semibold mb-4">Sign Up</h2>
          <form class="space-y-6" action="#" method="POST">
            <div>
              <label for="email" class="block text-sm/6 font-medium text-gray-100">Email address</label>
              <div class="mt-2">
                <input type="email" name="email" id="email" autocomplete="email" required=""
                  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm/6 font-medium text-gray-100">Password</label>
                <div class="text-sm">
                  <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
                </div>
              </div>
              <div class="mt-2">
                <input type="password" name="password" id="password" autocomplete="current-password" required=""
                  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <button type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign
                in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
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