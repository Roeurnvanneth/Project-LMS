<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");
const errorMessage = ref("");

const handleSubmit = async (e) => {
  e.preventDefault();
  errorMessage.value = "";

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    if (!res.ok) {
      throw new Error("Invalid username or password");
    }

    const data = await res.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("isLoggedIn", "true");

    router.push("/dashboard");
  } catch (error) {
    errorMessage.value = error.message || "Login failed";
  }
};
</script>

<template>
  <div
    class="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500"
  >
    <div
      class="bg-white/40 backdrop-blur-md rounded-lg p-8 flex flex-col md:flex-row w-full max-w-5xl"
    >
      <!-- Login Form -->
      <div
        class="w-full md:w-1/2 flex flex-col justify-center items-center space-y-6 px-6"
      >
        <img src="../assets/Lidrary.png" alt="Logo" class="w-20 h-20" />

        <form @submit.prevent="handleSubmit" class="space-y-4 h-full w-full">
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Username</label
            >
            <input
              v-model="username"
              type="text"
              placeholder="Username"
              required
              class="mt-1 w-full px-4 py-2 border border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Password:</label
            >
            <input
              v-model="password"
              type="password"
              placeholder="password"
              required
              class="mt-1 w-full px-4 py-2 border border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <!-- Error Message -->
          <p
            v-if="errorMessage"
            class="text-red-600 text-sm font-medium text-center"
          >
            {{ errorMessage }}
          </p>

          <div class="flex justify-center">
            <button
              type="submit"
              class="w-1/2 bg-gradient-to-br from-cyan-500 to-green-500 rounded-lg shadow bg-green-500 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition rounded-lg font-bold text-white py-2 rounded-full  transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      <!-- Right Side Panel -->
      <div
        class="w-full md:w-[350px] h-full p-6 text-center border border-blue-400 rounded-md shadow-lg bg-white/60 backdrop-blur-md mt-8 md:mt-0"
      >
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
