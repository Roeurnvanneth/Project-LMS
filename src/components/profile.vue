<script setup>
import Image from '../assets/neth.jpg'

const AdminName = "ROEURN VANNETH";
</script>

<template>
  <header class="w-full flex justify-between mx-auto">
    <a
      href="#"
      class="block w-full p-6 bg-white border border-gray-200 shadow-sm   rounded-b-3xl transition duration-200"
    >
      <div class="flex items-center space-x-4">
        <div class="relative w-20 h-20 overflow-hidden rounded-full">
          <img :src="Image" alt="Avatar" class="object-cover w-full h-full" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-800 ">LIBRARIAN</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{ AdminName }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-300">ID : 22492-3</p>
        </div>
        <button
          @click="handleLogout"
          class="ml-auto px-4 py-2  text-white rounded bg-gradient-to-br from-cyan-500 to-green-500 rounded-lg shadow bg-green-500 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition rounded-lg"
        >
          Log Out
        </button>
      </div>
    </a>
  </header>
</template>
