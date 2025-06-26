<!-- File: src/views/AddBorrows.vue -->
<template>
  <div class="min-h-screen bg-white p-6">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Add New Borrow</h1>
      <router-link
        to="/borrow"
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        ← Back to Borrow
      </router-link>
    </div>

    <form @submit.prevent="submitForm" class="space-y-4 max-w-md">
      <input v-model="form.full_name" type="text" placeholder="Full Name" class="w-full px-4 py-2 border rounded" required />
      <input v-model="form.id_card" type="text" placeholder="ID Card" class="w-full px-4 py-2 border rounded" required />
      <input v-model="form.title" type="text" placeholder="Book Title" class="w-full px-4 py-2 border rounded" required />
      <label for="day borrow">Day borrow</label>
      <input v-model="form.borrow_date" type="datetime-local" class="w-full px-4 py-2 border rounded" required />
    <label for="return_date">Return Date</label>
      <input v-model="form.return_date" type="datetime-local" class="w-full px-4 py-2 border rounded" required />

      <button type="submit" class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  book_id: null,
  full_name: '',
  id_card: '',
  title: '',
  borrow_date: '',
  return_date: ''
})

const submitForm = async () => {
  try {
    const token = localStorage.getItem('token')

    const payload = {
      ...form.value,
      borrow_date: new Date(form.value.borrow_date).toISOString(),
      return_date: new Date(form.value.return_date).toISOString()
    }

    console.log('Submitting payload:', payload)

    const response = await fetch('http://localhost:3000/api/borrows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    console.log('Response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Server error:', errorData)
      throw new Error(errorData.message || 'Failed to add borrow')
    }

    alert('✅ Borrow added successfully!')
    router.push('/borrows') // go back to borrow list page
  } catch (err) {
    console.error('Submit error:', err)
    alert('❌ Error: ' + err.message)
  }
}



</script>
