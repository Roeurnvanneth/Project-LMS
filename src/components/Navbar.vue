<script setup>
import { useRoute } from "vue-router";
import { LayoutDashboard, BookOpen, Users, TrendingUp } from "lucide-vue-next";
import Image from "../assets/Lidrary.png";

const route = useRoute();

const isActive = (path) => {
  return route.path === path
    ? "bg-blue-100 text-blue-700  "
    : "text-gray-500 hover:text-blue-600 ";
};

const menuItems = [
  { name: "Dashboard", path: "/",  },
  { name: "Borrow", path: "/borrow",},
  { name: "Students", path: "/student", },
  { name: "Book", path: "/book", },


];
</script>

<template>
  <div class="flex h-screen bg-gray-50  " >

    <aside class="w-64 bg-green-900 dark:bg-green-700 shadow-lg p-6 flex flex-col justify-between">
      <div>
        <img :src="Image" alt="Avatar" class="object-cover w-42 h-18 p-3" />
        <nav class="space-y-3">
          <router-link
            v-for="item in menuItems"
            :key="item.name"
            :to="item.path"
            class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200"
            :class="isActive(item.path)"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="text-sm font-medium">{{ item.name }}</span>
          </router-link>
        </nav>
      </div>
    </aside>
  </div>
</template>
