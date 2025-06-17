Login.vue
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const handleLogin = () => {
  // Simulate login
  localStorage.setItem("isLoggedIn", "true");
  router.push("/dashboard");
};
</script>


<template>
  <form @submit.prevent="handleLogin" class="space-y-4">
    <input
      type="email"
      placeholder="Email"
      required
      class="w-full px-4 py-2 border rounded"
    />
    <input
      type="password"
      placeholder="Password"
      required
      class="w-full px-4 py-2 border rounded"
    />
    <button
      type="submit"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Login
    </button>
  </form>
</template>
