<template>
  <div class="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 p-6">

    <div class="sticky top-0 z-10 bg-white shadow-md p-4 rounded-lg">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <form class="w-full sm:w-96">
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search by name..."
              class="w-full ps-10 py-2 text-sm text-gray-900 border border-blue-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />

            
          </div>
        </form>

        <router-link
          to="/add-borrows"
          class="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg shadow hover:from-cyan-600 hover:to-blue-600 focus:ring-4 focus:ring-cyan-300 transition"
          >
          + Add Borrow
        </router-link>

      </div>
    </div>

    <div class="overflow-x-auto mt-6 rounded-lg shadow">
      <table class="w-full text-sm text-left text-gray-600">
        <thead class="text-xs text-gray-700 uppercase bg-white">
          <tr>
            <th class="px-6 py-3">ID</th>
            <th class="px-6 py-3">ID Card</th>
            <th class="px-6 py-3">Full Name</th>
            <th class="px-6 py-3">Book Title</th>
            <th class="px-6 py-3">Borrow Date</th>
            <th class="px-6 py-3">Return Date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="borrow in filteredBorrows"
            :key="borrow.id"
            class="bg-white/50 hover:bg-white/80 transition"
          >
            <td class="px-6 py-4 font-medium">{{ borrow.id }}</td>
            <td class="px-6 py-4">{{ borrow.id_card }}</td>
            <td class="px-6 py-4">{{ borrow.full_name }}</td>
            <td class="px-6 py-4">{{ borrow.title }}</td>
            <td class="px-6 py-4">{{ formatDate(borrow.borrow_date) }}</td>
            <td class="px-6 py-4">{{ formatDate(borrow.return_date) }}</td>
          </tr>
          <tr v-if="filteredBorrows.length === 0">
            <td colspan="6" class="text-center py-4 text-gray-500">No records found.</td>
          </tr>
        </tbody>
      </table>
    </div>

   
    <div class="flex justify-end gap-2 mt-4">
      <button
        v-for="page in totalPages"
        :key="page"
        :class="[
          'px-3 py-1 rounded shadow',
          currentPage === page
            ? 'bg-emerald-800 text-black'
            : 'bg-white text-green-600 hover:bg-gray-100 border'
        ]"
        @click="setPage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const borrows = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const totalPages = ref(1)
const perPage = 10

const fetchBorrows = async () => {
  try {
    const token = localStorage.getItem('token') 
    const response = await axios.get('http://localhost:3000/api/borrows', {
      params: {
        page: currentPage.value,
        limit: perPage
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    borrows.value = response.data.borrows || []
    totalPages.value = response.data.totalPages || 1
  } catch (error) {
    console.error('Failed to fetch borrows:', error)
  }
}


const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}


const filteredBorrows = computed(() => {
  return borrows.value.filter(b =>
    b.full_name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const setPage = (page) => {
  currentPage.value = page
  fetchBorrows()
}

onMounted(() => {
  fetchBorrows()
})
</script>

<style scoped>
</style>
