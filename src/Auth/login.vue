<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleLogin = () => {
  localStorage.setItem("isLoggedIn", "true");
  router.push("/dashboard");
};
</script>

<template>
  <div class="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500">
    <div class="bg-white/40 backdrop-blur-md rounded-lg p-8 flex flex-col md:flex-row w-full max-w-5xl">
      <!-- Left Section -->
      <div class="w-full md:w-1/2 flex flex-col justify-center items-center space-y-6 px-6">
        <img src="../assets/Lidrary.png" alt="Logo" class="w-20 h-20" />
        <form @submit.prevent="handleLogin" class="space-y-4 h-full w-full">
          <div>
            <label class="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              placeholder="email"
              required
              class="mt-1 w-full px-4 py-2 border border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              placeholder="password"
              required
              class="mt-1 w-full px-4 py-2 border border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div class="flex justify-center">
            <button
              type="submit"
              class="w-1/2 bg-blue-900 font-bold text-white py-2 rounded-full hover:bg-blue-800 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      <!-- Right Section -->
      <div class="w-full md:w-[350px] h-full p-6 text-center border border-blue-400 rounded-md shadow-lg bg-white/60 backdrop-blur-md mt-8 md:mt-0">
        <h2 class="text-3xl font-bold text-white">Welcome to Library</h2>
        <p class="text-blue-900 font-bold text-2xl mt-5">
          Please Complete <br />
          the information
        </p>
        <hr class="my-4 border-t border-white w-1/2 mx-auto" />
        <div class="mt-4 flex justify-center">
          <img src="../assets/Lidrary.png" alt="Logo" class="w-20 h-20" />
        </div>
      </div>
    </div>
  </div>
</template>