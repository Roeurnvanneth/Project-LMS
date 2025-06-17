<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleLogin = () => {
  localStorage.setItem("isLoggedIn", "true");
  router.push("/dashboard");
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
    <div class="bg-white/40 backdrop-blur-md rounded-lg shadow-lg p-8 flex w-full max-w-5xl">
      <!-- Left Section -->
      <div class="w-1/2 flex flex-col justify-center items-center space-y-6 px-6">
        <img src="../assets/Lidrary.png" alt="Logo" class="w-16 h-16" />
        <form @submit.prevent="handleLogin" class="w-full space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              placeholder="email"
              required
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              placeholder="password"
              required
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-800 text-white py-2 rounded-full hover:bg-blue-900 transition"
          >
            Login
          </button>
        </form>
      </div>

      <!-- Right Section -->
      <div class="w-1/2 flex flex-col justify-center items-center text-center bg-white/30 rounded-lg px-8">
        <h2 class="text-2xl font-semibold text-white">Welcome to Library</h2>
        <p class="text-white mt-2">Please Complete the information</p>
        <div class="mt-4">
          <img src="../assets/Lidrary.png" alt="Logo" class="w-16 h-16" />
        </div>
      </div>
    </div>

    <!-- Author -->
    <div class="absolute bottom-4 text-sm text-gray-600">
      © 2025 by Roeurn Vanneth
    </div>
  </div>
</template>
