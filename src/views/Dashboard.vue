<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import MonthlyChart from "../components/MonthlyChart.vue";

const dashboardData = ref({
  total_books: 0,
  total_students: 0,
  total_borrows: 0,
  borrowed_not_returned: 0,
  returned: 0,
});

// Fetch API
const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data, "dddd");
    dashboardData.value = res.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};

onMounted(fetchDashboardData);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 p-4">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-800">Dashboard</h1>
      <p class="text-sm text-gray-500 mt-1">
        <span class="text-purple-600 font-medium">Home</span> / Dashboard
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 ">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-sm text-gray-500 font-medium">Students</h2>
        <p class="text-2xl font-bold text-gray-800 mt-1">
          {{ dashboardData.total_students }}
        </p>
        <p class="text-green-500 text-sm mt-1">
          ▲ {{ dashboardData.total_students}}
         
        </p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-sm text-gray-500 font-medium">Books</h2>
        <p class="text-2xl font-bold text-gray-800 mt-1">
          {{ dashboardData.total_books }}
        </p>
        <p class="text-green-500 text-sm mt-1">
          ▲ {{ dashboardData.total_books }}
         
        </p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-sm text-gray-500 font-medium">Borrow Books</h2>
        <p class="text-2xl font-bold text-gray-800 mt-1">
          {{ dashboardData.total_borrows }}
        </p>
        <p class="text-green-500 text-sm mt-1">
          ▲ {{ dashboardData.total_borrows }}
          
        </p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-sm text-gray-500 font-medium">Borrowed not returned</h2>
        <p class="text-2xl font-bold text-gray-800 mt-1">
          {{ dashboardData.borrowed_not_returned }}
        </p>
        <p class="text-green-500 text-sm mt-1">
          ▲ {{ dashboardData.borrowed_not_returned }}
       
        </p>
      </div>

       <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-sm text-gray-500 font-medium">Returned</h2>
        <p class="text-2xl font-bold text-gray-800 mt-1">
          {{ dashboardData.returned}}
        </p>
        <p class="text-green-500 text-sm mt-1">
          ▲ {{ dashboardData.returned }}
         
        </p>
        
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="bg-white p-6 rounded-lg shadow-md col-span-2">
        <h2 class="text-blue-600 font-semibold text-sm mb-2">
          Monthly Recap Report
        </h2>
        <MonthlyChart />
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-blue-600 font-semibold text-sm">
            List about Student
          </h2>
          <button
            class="text-sm px-3 py-1 border rounded text-blue-700 border-blue-300"
          >
            Month
          </button>
        </div>

        <div class="space-y-3 text-sm text-gray-700">
          <div>
            <p class="flex justify-between">
              <span>Student</span>
              <span
                >{{ dashboardData.students }} of
                {{ dashboardData.total }} Items</span
              >
            </p>
            <div class="h-2 bg-gray-200 rounded">
              <div
                class="h-full bg-orange-400 rounded"
                :style="{
                  width:
                    (
                      (dashboardData.students / dashboardData.total) *
                      100
                    ).toFixed(1) + '%',
                }"
              ></div>
            </div>
          </div>

          <div>
            <p class="flex justify-between">
              <span>Books</span>
              <span
                >{{ dashboardData.books }} of
                {{ dashboardData.total }} Items</span
              >
            </p>
            <div class="h-2 bg-gray-200 rounded">
              <div
                class="h-full bg-green-500 rounded"
                :style="{
                  width:
                    ((dashboardData.books / dashboardData.total) * 100).toFixed(
                      1
                    ) + '%',
                }"
              ></div>
            </div>
          </div>

          <div>
            <p class="flex justify-between">
              <span>Borrows</span>
              <span
                >{{ dashboardData.borrows }} of
                {{ dashboardData.total }} Items</span
              >
            </p>
            <div class="h-2 bg-gray-200 rounded">
              <div
                class="h-full bg-red-400 rounded"
                :style="{
                  width:
                    (
                      (dashboardData.borrows / dashboardData.total) *
                      100
                    ).toFixed(1) + '%',
                }"
              ></div>
            </div>
          </div>

          <div>
            <p class="flex justify-between">
              <span>Total</span>
              <span
                >{{ dashboardData.total }} of
                {{ dashboardData.total }} Items</span
              >
            </p>
            <div class="h-2 bg-gray-200 rounded">
              <div class="h-full bg-sky-400 rounded" style="width: 100%"></div>
            </div>
          </div>
        </div>

        <div class="mt-4 text-right">
          <a href="#" class="text-sm text-blue-600 hover:underline"
            >View More →</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
