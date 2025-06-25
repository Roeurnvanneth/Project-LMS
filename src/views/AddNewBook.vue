<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  title: "",
  description: "",
  author_id: null,
  category_id: null,
  quantity: 0,
  created_by: null,
});

const categories = [
  { id: 1, name: "Science & Technology" },
  { id: 2, name: "History" },
  { id: 3, name: "Mathematics" },
  { id: 4, name: "Computer Science" },
  { id: 5, name: "Literature" },
];

const submitForm = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(form.value),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add book");
    }

    alert("Book added successfully!");
    router.push("/book");
  } catch (error) {
    alert("Error: " + error.message);
    console.error("Failed to submit book:", error);
  }
};
</script>

<template>
  <div class="min-h-screen bg-white p-6">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Add New Book</h1>
      <router-link
        to="/book"
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        ← Back to book
      </router-link>
    </div>

    <form @submit.prevent="submitForm" class="space-y-4 max-w-md">
      <input
        v-model="form.title"
        type="text"
        placeholder="Title"
        class="w-full px-4 py-2 border rounded"
        required
      />

      <input
        v-model="form.description"
        type="text"
        placeholder="Description"
        class="w-full px-4 py-2 border rounded"
        required
      />

      <input
        v-model.number="form.author_id"
        type="number"
        placeholder="Author ID"
        class="w-full px-4 py-2 border rounded"
        required
      />

      <select
        v-model.number="form.category_id"
        class="w-full px-4 py-2 border rounded"
        required
      >
        <option disabled value="">Select Category</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>

      <input
        v-model.number="form.quantity"
        type="number"
        placeholder="Quantity"
        class="w-full px-4 py-2 border rounded"
        required
      />

      <input
        v-model.number="form.created_by"
        type="number"
        placeholder="Created By (User ID)"
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
