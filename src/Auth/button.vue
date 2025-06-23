
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  router.push("/login-book");
};
</script>

<template>
  <button
    @click="handleLogout"
    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
  >
    Log Out
  </button>
</template>
