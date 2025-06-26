<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const books = ref([])
const categories = ref([])
const searchQuery = ref('')
const selectedCategory = ref('All')
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

const fetchCategories = async () => {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.get("http://localhost:3000/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // Log to see the structure
    console.log("Category response:", response.data)

    // Assuming your API returns an array directly, or an object with a 'categories' key
    if (Array.isArray(response.data)) {
        categories.value = response.data;
    } else if (response.data.categories && Array.isArray(response.data.categories)) {
        categories.value = response.data.categories;
    } else if (response.data.data && Array.isArray(response.data.data)) {
        categories.value = response.data.data;
    } else {
        console.warn("Unexpected category response format:", response.data);
        // Fallback to hardcoded categories if API response is not as expected
        categories.value = [
          { id: 1, name: "Science & Technology" },
          { id: 2, name: "History" },
          { id: 3, name: "Mathematics" },
          { id: 4, name: "Computer Science" },
          { id: 5, name: "Literature" }
        ];
    }

  } catch (error) {
    console.error("Failed to fetch categories:", error)
 
    categories.value = [
      { id: 1, name: "Science & Technology" },
      { id: 2, name: "History" },
      { id: 3, name: "Mathematics" },
      { id: 4, name: "Computer Science" },
      { id: 5, name: "Literature" }
    ];
  }
}

onMounted(() => {
  fetchBooks()
  fetchCategories()
})

const filteredBooks = computed(() => {
  return books.value.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'All' || book.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredBooks.value.length / booksPerPage)
})

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * booksPerPage
  return filteredBooks.value.slice(start, start + booksPerPage)
})

const setPage = (page) => {
  currentPage.value = page
}

const deleteBook = async (id) => {
  const confirmed = confirm("Are you sure you want to delete this book?")
  if (!confirmed) return

  try {
    const token = localStorage.getItem("token")
    await axios.delete(`http://localhost:3000/api/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    await fetchBooks()
    alert("Book deleted successfully!")
  } catch (error) {
    console.error("Failed to delete book:", error)
    alert("Error deleting book.")
  }
}
</script>

<style scoped>

select {
 
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>







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

        <select
          v-model="selectedCategory"
          class="border text-sm rounded-lg block w-48 px-4 py-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
          :class="{ 'bg-pink-100 border-pink-300': selectedCategory === 'All' }"
          style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%20viewBox%3D%220%200%20292.4%20292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2C197.39L159.2%2C69.59c-3.124-3.124-8.188-3.124-11.312%2C0L5.39%2C197.39c-3.124%2C3.124-3.124%2C8.188%2C0%2C11.312l11.312%2C11.312c3.124%2C3.124%2C8.188%2C3.124%2C11.312%2C0L145.4%2C103.58l117.4%2C117.4c3.124%2C3.124%2C8.188%2C3.124%2C11.312%2C0l11.312-11.312C290.124%2C205.578%2C290.124%2C200.514%2C287%2C197.39z%22%2F%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 0.7em top 50%, 0 0; background-size: 0.65em auto;"
        >
          <option value="All">All Categories</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.name">
            {{ cat.name }}
          </option>
        </select>

        <router-link
          to="/add-book"
          class="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg shadow hover:from-cyan-600 hover:to-blue-600 focus:ring-4 focus:ring-cyan-300 transition"
        >
          + Add book
        </router-link>
      </div>
    </div>

    <div class="overflow-x-auto mt-6 rounded-lg shadow">
      <table class="w-full text-sm text-left text-gray-600">
        <thead class="text-xs text-gray-700 uppercase bg-white">
          <tr>
            <th class="px-6 py-3">ID</th>
            <th class="px-6 py-3">Title</th>
            <th class="px-6 py-3">Description</th>
            <th class="px-6 py-3 bg-pink-100">Quantity</th>
            <th class="px-6 py-3">Author</th>
            <th class="px-6 py-3">Category</th>
            <th class="px-6 py-3">Created By</th>
            <th class="px-6 py-3 bg-pink-100">Actions</th>
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

