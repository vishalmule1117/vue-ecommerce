<template>
    <div
        class="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-6">

        <!-- Sign Up Card -->
        <div
            class="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 transition-all duration-500 hover:scale-105">
            <h2 class="text-2xl font-bold text-center text-white mb-6">
                Create Account
            </h2>

            <form class="space-y-4" @submit.prevent="handelSignup">
                <!-- Name -->
                <div>
                    <label class="block text-white text-sm">Full Name</label>
                    <input v-model="name" type="text"
                        class="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter your name" />
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-white text-sm">Email</label>
                    <input v-model="email" type="email"
                        class="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter your email" />
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-white text-sm">Password</label>
                    <input v-model="password" type="password"
                        class="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter your password" />
                </div>

                <!-- Submit -->
                <button type="submit"
                    class="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transform transition">
                    Sign Up
                </button>
            </form>

            <div>
                <p v-if="message" class="mt-4 text-center text-sm text-green-400">{{ message }}</p>
                <p v-if="error" class="mt-4 text-center text-sm text-red-400">{{ error }}</p>
            </div>

            <!-- Switch Mode -->
            <p class="mt-6 text-center text-sm my-8 text-gray-200">
                Already have an account?
                <span class="text-indigo-400 cursor-pointer hover:underline">
                    <NuxtLink to="/Login">Login</NuxtLink>
                </span>
            </p>
        </div>
    </div>
</template>

<script setup>
//! State varibale
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const message = ref("");
const error = ref("");

const router = useRouter();

const handelSignup = async () => {
    try {
        const res = await fetch("https://node-rest-api-ecommerce.onrender.com/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value
            }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Signup Failed");

        message.value = data.msg || "Signup successful!";
        error.value = "";

        //Redirect Login page 
        setTimeout(() => {
            router.push("/login");
        }, 2000);

    } catch (err) {
        error.value = err.message;
        message.value = "";
    }
}
</script>
