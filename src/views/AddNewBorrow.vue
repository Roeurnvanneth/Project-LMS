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
      
      <select
        v-model="selectedStudentId"
        @change="handleStudentSelect"
        class="w-full px-4 py-2 border rounded"
        required
      >
        <option disabled value="">Select a Student</option>
        <option v-for="student in students" :key="student.id" :value="student.id">
          {{ student.full_name }}
        </option>
      </select>

     
      <input
        v-model="form.id_card"
        type="text"
        placeholder="Student ID Card"
        class="w-full px-4 py-2 border rounded"
        readonly
        required
      />

      
      <select
        v-model="selectedBookId"
        class="w-full px-4 py-2 border rounded"
        required
      >
        <option disabled value="">Select a Book Title</option>
        <option v-for="book in books" :key="book.id" :value="book.id">
          {{ book.title }}
        </option>
      </select>

     
      <label for="borrow_date">Borrow Date</label>
      <input
        v-model="form.borrow_date"
        type="datetime-local"
        class="w-full px-4 py-2 border rounded"
        required
      />

      
      <label for="return_date">Return Date</label>
      <input
        v-model="form.return_date"
        type="datetime-local"
        class="w-full px-4 py-2 border rounded"
        required
      />

      
      <button
        type="submit"
        class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
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
  full_name: '',
  id_card: '',           
  borrow_date: '',
  return_date: '',
})


const selectedStudentId = ref('')
const selectedBookId = ref('')


const students = [
  { id: 1, full_name: "Dara Sok", id_card: "STU001" },
  { id: 2, full_name: "Vicheka Mao", id_card: "STU002" },
  { id: 3, full_name: "Ratanak Hun", id_card: "STU003" },
  { id: 4, full_name: "Chanthy Roeun", id_card: "STU004" },
  { id: 5, full_name: "Nita Yin", id_card: "STU005" },
  { id: 6, full_name: "kakada", id_card: "STU0001" },
  { id: 9, full_name: "Sopheap", id_card: "STU0007" },
  { id: 11, full_name: "Lykim", id_card: "STU0008" },
  { id: 13, full_name: "AYING", id_card: "STU0009" },
  { id: 14, full_name: "Aladin", id_card: "STU00010" },
  { id: 16, full_name: "kakada", id_card: "STU0021" },
  { id: 18, full_name: "reach", id_card: "STU00022" }
]


const books = [
  { id: 16, title: "HTML & CSS Basics" },
  { id: 17, title: "Mastering JavaScript" },
  { id: 18, title: "Vue.js Essentials" },
  { id: 19, title: "Node.js and Express" },
  { id: 20, title: "SQL for Beginners" },
  { id: 21, title: "Advanced MySQL" },
  { id: 22, title: "Clean Code" },
  { id: 23, title: "Agile Development" },
  { id: 24, title: "Digital Marketing 101" },
  { id: 25, title: "UI/UX Design Basics" },
  { id: 26, title: "React for Beginners" },
  { id: 27, title: "Git & GitHub Guide" },
  { id: 28, title: "Linux Command Line" },
  { id: 29, title: "Python for Everyone" },
  { id: 30, title: "Data Structures" },
  { id: 33, title: "Data Structures" },
  { id: 34, title: "Structures" },
  { id: 35, title: "kid of cat" },
  { id: 36, title: "Data Structures" }
]


const handleStudentSelect = () => {
  const student = students.find(s => s.id === Number(selectedStudentId.value))
  if (student) {
    form.value.id_card = student.id_card
    form.value.full_name = student.full_name
  }
}


const submitForm = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('❌ Please log in first.')
    return
  }

  if (!selectedBookId.value) {
    alert('❌ Please select a book.')
    return
  }


  const payload = {
    full_name: form.value.full_name,
    id_card: form.value.id_card,
    book_id: Number(selectedBookId.value),
    borrow_date: new Date(form.value.borrow_date).toISOString(),
    return_date: new Date(form.value.return_date).toISOString()
  }

  
  console.log("📦 Sending Payload:", payload)

  try {
    const res = await fetch('http://localhost:3000/api/borrows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    const responseData = await res.json()

    if (!res.ok) {
      console.error("❌ Server Response:", responseData)
      throw new Error(responseData.message || 'Failed to add borrow')
    }

    alert('✅ Borrow added successfully!')
    router.push('/borrow')
  } catch (err) {
    console.error('❌ Submit Error:', err)
    alert('❌ Failed to submit: ' + err.message)
  }
}

</script>
