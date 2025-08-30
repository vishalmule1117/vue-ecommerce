<template>
    <div
        class="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-6">
        <!-- Sign In Card -->
        <div
            class="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 transition-all duration-500 hover:scale-105">
            <h2 class="text-2xl font-bold text-center text-white mb-6">
                Welcome Back
            </h2>

            <form class="space-y-4">
                <!-- Email -->
                <div>
                    <label class="block text-white text-sm">Email</label>
                    <input type="email"
                        class="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter your email" />
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-white text-sm">Password</label>
                    <input type="password"
                        class="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter your password" />
                </div>

                <!-- Submit -->
                <button type="button"
                    class="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transform transition">
                    Sign In
                </button>
            </form>

            <!-- Switch Mode -->
            <p class="mt-6 text-center text-sm text-gray-200">
                Don’t have an account?
                <span class="text-indigo-400 cursor-pointer hover:underline">
                    Sign Up
                </span>
            </p>
        </div>
    </div>
</template>