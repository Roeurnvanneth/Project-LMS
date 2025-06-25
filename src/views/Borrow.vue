<!-- File: src/views/Borrow.vue -->
<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold text-center mb-6">📚 Borrow Records</h1>

    <div class="text-right mb-4">
      <button @click="openAddModal" class="bg-blue-600 text-white px-4 py-2 rounded">
        + Add Borrow
      </button>
    </div>

    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>

    <div v-else>
      <table class="w-full border border-collapse text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="border px-4 py-2">#</th>
            <th class="border px-4 py-2">ID Card</th>
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Book</th>
            <th class="border px-4 py-2">Borrowed</th>
            <th class="border px-4 py-2">Returned</th>
            <th class="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(borrow, index) in borrows" :key="borrow.id" class="hover:bg-gray-50">
            <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ borrow.id_card }}</td>
            <td class="border px-4 py-2">{{ borrow.full_name }}</td>
            <td class="border px-4 py-2">{{ borrow.title }}</td>
            <td class="border px-4 py-2">{{ formatDate(borrow.borrow_date) }}</td>
            <td class="border px-4 py-2">{{ formatDate(borrow.return_date) }}</td>
            <td class="border px-4 py-2 flex gap-2 justify-center">
              <button @click="openEditModal(borrow)" class="bg-yellow-400 text-white px-2 py-1 rounded text-xs">
                Edit
              </button>
              <button @click="deleteBorrow(borrow.id)" class="bg-red-500 text-white px-2 py-1 rounded text-xs">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">
          {{ isEdit ? 'Edit Borrow Record' : 'Add Borrow Record' }}
        </h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="block mb-1">ID Card</label>
            <input v-model="form.id_card" class="w-full border p-2 rounded" required />
          </div>
          <div class="mb-3">
            <label class="block mb-1">Full Name</label>
            <input v-model="form.full_name" class="w-full border p-2 rounded" required />
          </div>
          <div class="mb-3">
            <label class="block mb-1">Book Title</label>
            <input v-model="form.title" class="w-full border p-2 rounded" required />
          </div>
          <div class="mb-3">
            <label class="block mb-1">Borrow Date</label>
            <input type="datetime-local" v-model="form.borrow_date" class="w-full border p-2 rounded" required />
          </div>
          <div class="mb-3">
            <label class="block mb-1">Return Date</label>
            <input type="datetime-local" v-model="form.return_date" class="w-full border p-2 rounded" required />
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <button type="button" @click="closeModal" class="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
              {{ isEdit ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { toRaw } from 'vue'

const borrows = ref([])
const loading = ref(true)
const error = ref(null)
const showModal = ref(false)
const isEdit = ref(false)
const selectedBorrow = ref(null)

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImxpYmVyaWFuIiwiaWF0IjoxNzUwNzU2NzE3fQ.pGQWLMGkpIxfZvrgKFLgENRUUU_wME07ZOttkxuoQyE'


const form = reactive({
  id_card: '',
  full_name: '',
  title: '',
  borrow_date: '',
  return_date: ''
})

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
}

const fetchBorrows = async () => {
  loading.value = true
  try {
    const res = await axios.get('http://localhost:4000/api/borrows?page=1&limit=20', {
      headers: { Authorization: `Bearer ${token}` }
    })
    borrows.value = res.data.borrows
  } catch (err) {
    error.value = err.response?.data?.message || 'Error fetching borrows'
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
}

const openAddModal = () => {
  isEdit.value = false
  selectedBorrow.value = null
  Object.assign(form, {
    id_card: '',
    full_name: '',
    title: '',
    borrow_date: '',
    return_date: ''
  })
  showModal.value = true
}

const openEditModal = (borrow) => {
  isEdit.value = true
  selectedBorrow.value = { ...borrow }
  Object.assign(form, borrow)
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const handleSubmit = async () => {
  try {
    const payload = toRaw(form)
    if (isEdit.value) {
      await axios.put(`http://localhost:4000/api/borrows/${selectedBorrow.value.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } else {
      await axios.post('http://localhost:4000/api/borrows', payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
    }
    await fetchBorrows()
    closeModal()
  } catch (err) {
    console.error('Submit error:', err)
  }
}

const deleteBorrow = async (id) => {
  const confirmDelete = confirm('Are you sure you want to delete this record?')
  if (!confirmDelete) return

  try {
    await axios.delete(`http://localhost:4000/api/borrows/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    await fetchBorrows()
  } catch (err) {
    console.error('Delete error:', err)
    alert('Failed to delete. Please check your token or permissions.')
  }
}

onMounted(fetchBorrows)
</script>
