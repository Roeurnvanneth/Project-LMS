<template>

  <div v-if="!isLoginPage" class="h-screen flex">
    <aside class="flex-shrink-0 h-full">
  
      <Navbar />
    </aside>
    <div class="flex flex-col flex-1 overflow-hidden">
        <Profile/>
      <main class="flex-1 overflow-y-auto">
        <router-view />
          
      </main>
    </div>
  </div>
  <div v-else class="h-screen">
    <router-view />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Profile from "./components/profile.vue";

const route = useRoute();

const isLoginPage = computed(() => ["/login-dasboard", "/"].includes(route.path));
</script>
