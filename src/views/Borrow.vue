<template>
  <div class="min-h-screen bg-white p-6">
    <h1 class="text-2xl font-bold mb-6">Borrowed Books</h1>

    <div class="overflow-x-auto w-full">
      <table class="w-full min-w-max border border-gray-300 divide-y divide-gray-200 text-sm text-left text-gray-700">
        <thead class="bg-gray-100 text-gray-900">
          <tr>
            <th class="px-4 py-2">ID</th>
            <th class="px-4 py-2">ID Card</th>
            <th class="px-4 py-2">Full Name</th>
            <th class="px-4 py-2">Book Title</th>
            <th class="px-4 py-2">Borrow Date</th>
            <th class="px-4 py-2">Return Date</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="borrow in borrows" :key="borrow.id" class="hover:bg-gray-50">
            <td class="px-4 py-2">{{ borrow.id }}</td>
            <td class="px-4 py-2">{{ borrow.id_card }}</td>
            <td class="px-4 py-2">{{ borrow.full_name }}</td>
            <td class="px-4 py-2">{{ borrow.title }}</td>
            <td class="px-4 py-2">{{ formatDate(borrow.borrow_date) }}</td>
            <td class="px-4 py-2">{{ formatDate(borrow.return_date) }}</td>
          </tr>
          <tr v-if="borrows.length === 0">
            <td colspan="6" class="text-center text-gray-400 py-4">No data found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const borrows = ref([])

const fetchBorrows = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/borrows?page=1&limit=15')

    // ✅ Because your API returns a plain array
    console.log('✅ Got data:', response.data)
    borrows.value = response.data
  } catch (error) {
    console.error('❌ Failed to fetch data:', error)
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return isNaN(date) ? 'Invalid Date' : date.toLocaleString()
}

onMounted(fetchBorrows)
</script>
