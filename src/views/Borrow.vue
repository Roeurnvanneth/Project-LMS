
<template>
  <div class="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 p-6">
    <div class="sticky top-0 z-10 bg-white shadow-md p-4 rounded-lg mb-6">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
        <div class="w-full sm:w-96">
          <form>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input v-model="searchQuery" type="search" placeholder="Search books..." class="w-full pl-10 py-2 text-sm text-gray-900 border border-blue-400 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
            </div>
          </form>
        </div>

        <button @click="toggleForm" class="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg shadow hover:from-cyan-600 hover:to-blue-600 focus:ring-4 focus:ring-cyan-300 transition">
          {{ isFormVisible ? "Open Form" : "+Add Borrow" }}
        </button>
      </div>
    </div>

    <!-- Borrow Form -->
<transition name="fade">
  <form
    v-show="isFormVisible"
    @submit.prevent="handleAddBorrow"
    class="bg-white p-6 rounded-lg shadow-xl space-y-6 max-w-4xl mx-auto mb-10 transition-all duration-300"
  >
    <h2 class="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">📚 New Borrow Record</h2>

    <div class="grid md:grid-cols-2 gap-6">
      <!-- Book Search -->
      <div class="relative">
        <label for="bookSearch" class="block text-sm font-medium text-gray-700 mb-1">Search Book</label>
        <input
          id="bookSearch"
          v-model="bookSearch"
          type="text"
          placeholder="Type book title..."
          class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          autocomplete="off"
        />
        <ul
          v-if="bookSearch && filteredBooks.length"
          class="absolute z-20 bg-white border w-full rounded shadow max-h-48 overflow-y-auto mt-1"
        >
          <li
            v-for="book in filteredBooks"
            :key="book.id"
            @click="selectBook(book)"
            class="px-4 py-2 hover:bg-blue-100 cursor-pointer flex justify-between items-center"
          >
            <span>{{ book.title }} — {{ book.author_name || "Unknown" }}</span>
            <button
              @click.stop="handleDeleteBook(book)"
              class="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 disabled:opacity-50"
              :disabled="deletingBookId === book.id"
            >
              {{ deletingBookId === book.id ? "Deleting..." : "Delete" }}
            </button>
          </li>
        </ul>
      </div>

      <!-- Student Search -->
      <div class="relative">
        <label for="studentSearch" class="block text-sm font-medium text-gray-700 mb-1">Search Student</label>
        <input
          id="studentSearch"
          v-model="studentSearch"
          type="text"
          placeholder="Type student name..."
          class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          autocomplete="off"
        />
        <ul
          v-if="studentSearch && filteredStudents.length"
          class="absolute z-20 bg-white border w-full rounded shadow max-h-48 overflow-y-auto mt-1"
        >
          <li
            v-for="student in filteredStudents"
            :key="student.id"
            @click="selectStudent(student)"
            class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
          >
            {{ student.full_name }} <small class="text-gray-500">({{ student.class || "N/A" }})</small>
          </li>
        </ul>
      </div>

      <!-- Borrow Date -->
      <div>
        <label for="borrowDate" class="block text-sm font-medium text-gray-700 mb-1">Borrow Date</label>
        <input
          id="borrowDate"
          type="date"
          v-model="form.borrow_date"
          class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <!-- Return Date -->
      <div>
        <label for="returnDate" class="block text-sm font-medium text-gray-700 mb-1">Return Date (optional)</label>
        <input
          id="returnDate"
          type="date"
          v-model="form.return_date"
          class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>

   

    <!-- Submit -->
    <button
      type="submit"
      class="w-full mt-6 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg py-2 font-semibold text-lg disabled:opacity-50"
      :disabled="!form.student_id || !form.book_id"
    >
     Submit 
    </button>
  </form>
</transition>


    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-10">
      <div class="animate-spin h-8 w-8 mx-auto text-blue-500 border-4 border-blue-300 border-t-transparent rounded-full"></div>
      <p class="mt-2 text-sm text-gray-500">Loading borrowed books...</p>
    </div>

    <!-- Error Message -->
    <div v-else-if="errorMessage" class="text-red-500 text-center mb-6">{{ errorMessage }}</div>

    <!-- Borrow List Table -->
    <div v-else class="overflow-x-auto max-w-6xl mx-auto rounded-lg shadow bg-white">
      <table class="w-full text-sm text-left text-gray-700 table-auto border border-gray-200 rounded-lg">
        <thead class="text-xs text-gray-700 uppercase bg-white">
          <tr>
            <th class="px-4 py-3">No</th>
            <th class="px-4 py-3">Book Title</th>
            <th class="px-4 py-3">Student Name</th>
            <th class="px-4 py-3">Borrowed On</th>
            <th class="px-4 py-3">Returned On</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="(borrow, index) in filteredBorrows" :key="borrow.id" class="bg-white/50 hover:bg-white/80 transition">
            <td class="px-4 py-3">{{ index + 1 + (currentPage - 1) * limit }}</td>
            <td class="px-4 py-3 font-medium text-gray-800">{{ borrow.title }}</td>
            <td class="px-4 py-3">{{ borrow.full_name }}</td>
            <td class="px-4 py-3 text-gray-600">{{ formatDate(borrow.borrow_date) }}</td>
            <td class="px-4 py-3 text-gray-600">{{ borrow.return_date ? formatDate(borrow.return_date) : "Not returned" }}</td>
            <td class="px-4 py-3">
              <span :class="borrow.return_date ? 'px-4 py-1 text-white bg-blue-500 rounded' : 'px-4 py-1 text-white bg-red-500 rounded'">
                {{ borrow.return_date ? "Returned" : "Borrowed" }}
              </span>
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button @click="deleteBorrow(borrow)" :disabled="deletingBorrowId === borrow.id" class="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                  {{ deletingBorrowId === borrow.id ? "Deleting..." : "Delete" }}
                </button>
                <button v-if="!borrow.return_date" @click="returnBorrow(borrow)" class="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Return</button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredBorrows.length === 0">
            <td colspan="7" class="text-center py-6 text-gray-500">No records found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-6 max-w-6xl mx-auto flex-wrap">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
      <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="[ page === currentPage ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100', 'px-3 py-1 border rounded transition' ]">
        {{ page }}
      </button>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-3 py-1 border rounded disabled:opacity-50">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const borrows = ref([]);
const students = ref([]);
const books = ref([]);

const isLoading = ref(true);
const errorMessage = ref('');
const deletingBorrowId = ref(null);
const deletingBookId = ref(null);

const isFormVisible = ref(false);
const toggleForm = () => (isFormVisible.value = !isFormVisible.value);

const searchQuery = ref('');
const bookSearch = ref('');
const studentSearch = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const limit = 10;

const form = ref({
  student_id: '',
  book_id: '',
  borrow_date: '',
  return_date: '',
});

const fetchBorrows = async (page = 1) => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${baseUrl}/api/borrows?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch borrowed books');
    const data = await res.json();
    borrows.value = data.borrows || [];
    currentPage.value = data.currentPage || 1;
    totalPages.value = data.totalPages || 1;
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};

const fetchStudentsAndBooks = async () => {
  try {
    const token = localStorage.getItem('token');
    const [studentsRes, booksRes] = await Promise.all([
      fetch(`${baseUrl}/api/students?page=1&limit=1000`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`${baseUrl}/api/books?page=1&limit=1000`, { headers: { Authorization: `Bearer ${token}` } }),
    ]);
    students.value = (await studentsRes.json()).students || [];
    books.value = (await booksRes.json()).books || [];
  } catch (err) {
    console.error(err);
  }
};

const formatDate = (d) => new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

const filteredBorrows = computed(() =>
  !searchQuery.value.trim()
    ? borrows.value
    : borrows.value.filter((b) => b.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || b.full_name.toLowerCase().includes(searchQuery.value.toLowerCase()))
);

const filteredBooks = computed(() => {
  const q = bookSearch.value.toLowerCase();
  return books.value.filter((book) => book.title.toLowerCase().includes(q) || (book.author_name || '').toLowerCase().includes(q));
});

const filteredStudents = computed(() => {
  const q = studentSearch.value.toLowerCase();
  return students.value.filter((s) => s.full_name.toLowerCase().includes(q) || (s.class || '').toLowerCase().includes(q));
});

const selectBook = (book) => {
  form.value.book_id = book.id;
  bookSearch.value = book.title;
};

const selectStudent = (student) => {
  form.value.student_id = student.id;
  studentSearch.value = student.full_name;
};

const handleAddBorrow = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${baseUrl}/api/borrows`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form.value),
    });
    if (!res.ok) throw new Error('Failed to add borrow');
    alert('🎉 Borrow added!');
    form.value = { student_id: '', book_id: '', borrow_date: '', return_date: '' };
    fetchBorrows(currentPage.value);
  } catch (err) {
    alert(`❌ ${err.message}`);
  }
};

const deleteBorrow = async (borrow) => {
  if (!confirm(`Delete borrow ID ${borrow.id}?`)) return;
  deletingBorrowId.value = borrow.id;
  try {
    const token = localStorage.getItem('token');
    await fetch(`${baseUrl}/api/borrows/${borrow.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    borrows.value = borrows.value.filter((b) => b.id !== borrow.id);
    alert('✅ Deleted borrow');
  } catch (err) {
    alert(`❌ ${err.message}`);
  } finally {
    deletingBorrowId.value = null;
  }
};

const handleDeleteBook = async (book) => {
  if (!confirm(`Delete book "${book.title}"?`)) return;
  deletingBookId.value = book.id;
  try {
    const token = localStorage.getItem('token');
    await fetch(`${baseUrl}/api/books/${book.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchStudentsAndBooks();
    alert('✅ Book deleted');
  } catch (err) {
    alert(`❌ ${err.message}`);
  } finally {
    deletingBookId.value = null;
  }
};

const returnBorrow = async (borrow) => {
  if (!confirm(`Mark ID ${borrow.id} as returned?`)) return;
  const token = localStorage.getItem('token');
  const res = await fetch(`${baseUrl}/api/borrows/${borrow.id}/return`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    alert('✅ Returned!');
    fetchBorrows(currentPage.value);
  } else {
    alert('❌ Failed to return');
  }
};

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  fetchBorrows(page);
};

onMounted(() => {
  fetchBorrows();
  fetchStudentsAndBooks();
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
