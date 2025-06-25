<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const fullName = ref("");
const studentClass = ref("");
const idCard = ref("");
const router = useRouter();

const submitForm = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:3000/api/students",
      {
        full_name: fullName.value,
        student_class: studentClass.value,
        id_card: idCard.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    router.push("/students");
  } catch (error) {
    console.error("Failed to add student:", error);
  }
};
</script>

<template>
  <div class="min-h-screen bg-white p-6">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Add New Student</h1>

      <router-link
        to="/students"
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        ← Back to Students
      </router-link>
    </div>

    <form @submit.prevent="submitForm" class="space-y-4 max-w-md">
      <input
        v-model="fullName"
        type="text"
        placeholder="Full Name"
        class="w-full px-4 py-2 border rounded"
        required
      />
      <input
        v-model="studentClass"
        type="text"
        placeholder="Class"
        class="w-full px-4 py-2 border rounded"
        required
      />
      <input
        v-model="idCard"
        type="text"
        placeholder="ID Card"
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
