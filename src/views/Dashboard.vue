<script setup>
import MonthlyChart from '../components/MonthlyChart.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4">

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-800">Dashboard</h1>
      <p class="text-sm text-gray-500 mt-1">
        <span class="text-purple-600 font-medium">Home</span> / Dashboard
      </p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-sm text-gray-500 font-medium">Students</h2>
        <p class="text-2xl font-bold text-gray-800 mt-1">200</p>
        <p class="text-green-500 text-sm mt-1">▲ 3.48% <span class="text-gray-500">from this month</span></p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-sm text-gray-500 font-medium">Books</h2>
        <p class="text-2xl font-bold text-gray-800 mt-1">650</p>
        <p class="text-green-500 text-sm mt-1">▲ 12% <span class="text-gray-500">from this month</span></p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-sm text-gray-500 font-medium">Borrow Books</h2>
        <p class="text-2xl font-bold text-gray-800 mt-1">366</p>
        <p class="text-green-500 text-sm mt-1">▲ 20.4% <span class="text-gray-500">from this month</span></p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-sm text-gray-500 font-medium">Total</h2>
        <p class="text-2xl font-bold text-gray-800 mt-1">200</p>
        <p class="text-red-500 text-sm mt-1">▼ 1.10% <span class="text-gray-500">from this month</span></p>
      </div>
    </div>

    <!-- Chart & Product Sales -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Chart -->
      <div class="bg-white p-6 rounded-lg shadow-md col-span-2">
        <h2 class="text-blue-600 font-semibold text-sm mb-2">Monthly Recap Report</h2>
        <MonthlyChart />
      </div>

      <!-- Product List -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-blue-600 font-semibold text-sm">Products Sold</h2>
          <button class="text-sm px-3 py-1 border rounded text-blue-700 border-blue-300">Month</button>
        </div>

        <div class="space-y-3 text-sm text-gray-700">
          <div>
            <p class="flex justify-between">
              <span>Oblong T-Shirt</span>
              <span>600 of 800 Items</span>
            </p>
            <div class="h-2 bg-gray-200 rounded">
              <div class="h-full bg-orange-400 rounded" style="width: 75%"></div>
            </div>
          </div>

          <div>
            <p class="flex justify-between">
              <span>Gundam 90'Editions</span>
              <span>500 of 800 Items</span>
            </p>
            <div class="h-2 bg-gray-200 rounded">
              <div class="h-full bg-green-500 rounded" style="width: 62.5%"></div>
            </div>
          </div>

          <div>
            <p class="flex justify-between">
              <span>Rounded Hat</span>
              <span>455 of 800 Items</span>
            </p>
            <div class="h-2 bg-gray-200 rounded">
              <div class="h-full bg-red-400 rounded" style="width: 56.8%"></div>
            </div>
          </div>

          <div>
            <p class="flex justify-between">
              <span>Indomie Goreng</span>
              <span>400 of 800 Items</span>
            </p>
            <div class="h-2 bg-gray-200 rounded">
              <div class="h-full bg-sky-400 rounded" style="width: 50%"></div>
            </div>
          </div>

          <div>
            <p class="flex justify-between">
              <span>Remote Control Car Racing</span>
              <span>200 of 800 Items</span>
            </p>
            <div class="h-2 bg-gray-200 rounded">
              <div class="h-full bg-green-300 rounded" style="width: 25%"></div>
            </div>
          </div>
        </div>

        <div class="mt-4 text-right">
          <a href="#" class="text-sm text-blue-600 hover:underline">View More →</a>
        </div>
      </div>
    </div>

  </div>
</template>
