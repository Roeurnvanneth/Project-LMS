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
              placeholder="Search books..."
              class="w-full ps-10 py-2 text-sm text-gray-900 border border-blue-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </form>

     
        <button class="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg shadow hover:from-cyan-600 hover:to-blue-600 focus:ring-4 focus:ring-cyan-300 transition">
          + Add Book
        </button>
      </div>
    </div>

    <!-- Book Table -->
    <div class="overflow-x-auto mt-6 rounded-lg shadow">
      <table class="w-full text-sm text-left text-gray-600">
        <thead class="text-xs text-gray-700 uppercase bg-white">
          <tr>
            <th class="px-6 py-3">ID</th>
            <th class="px-6 py-3">Title</th>
            <th class="px-6 py-3">Description</th>
            <th class="px-6 py-3">Quantity</th>
            <th class="px-6 py-3">Author</th>
            <th class="px-6 py-3">Category</th>
            <th class="px-6 py-3">Created By</th>
            <th class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in paginatedBooks" :key="book.id" class="bg-white/50 hover:bg-white/80 transition">
            <td class="px-6 py-4 font-medium">{{ book.id }}</td>
            <td class="px-6 py-4">{{ book.title }}</td>
            <td class="px-6 py-4">{{ book.description }}</td>
            <td class="px-6 py-4">{{ book.quantity }}</td>
            <td class="px-6 py-4">{{ book.author_name }}</td>
            <td class="px-6 py-4">{{ book.category }}</td>
            <td class="px-6 py-4">{{ book.created_by }}</td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <button class="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Edit</button>
                <button
                  @click="deleteBook(book.id)"
                  class="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="paginatedBooks.length === 0">
            <td colspan="8" class="text-center py-4 text-gray-500">No books found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
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

const books = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const booksPerPage = 5


const fetchBooks = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:3000/api/books?page=1&limit=100', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    books.value = response.data.books 
  } catch (error) {
    console.error('Failed to fetch books:', error)
  }
}

onMounted(() => {
  fetchBooks()
})

const filteredBooks = computed(() =>
  books.value.filter(book =>
    book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const totalPages = computed(() =>
  Math.ceil(filteredBooks.value.length / booksPerPage)
)

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * booksPerPage
  return filteredBooks.value.slice(start, start + booksPerPage)
})

const setPage = (page) => {
  currentPage.value = page
}

const deleteBook = (id) => {
  books.value = books.value.filter(book => book.id !== id)
}
</script>

<style scoped>
</style>
