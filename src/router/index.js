import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "@/views/Dashboard.vue";
import Book from "@/views/book.vue";
import Borrow from "@/views/Borrow.vue";
import Student from "@/views/student.vue";
import Login from "@/Auth/login-dasboard.vue";
import Hero from "@/Auth/login.vue";
import AddNewStudent from "@/views/AddNewStudent.vue";
import AddNewBook from "@/views/AddNewBook.vue";
import AddNewBorrows from "@/views/AddNewBorrow.vue";

const routes = [
  { path: '/books', component: Book },
  { path: '/add-book', component: AddNewBook },
  { path: '/add-borrows', component: AddNewBorrows },
  { path: '/', component: Hero, meta: { layout: 'auth' } },
  { path: '/students', component: Student, meta: { layout: 'main' } },
  { path: '/add-student', component: AddNewStudent, meta: { layout: 'main' } },
  { path: '/login', component: Login, meta: { layout: 'auth' } },
  { path: '/dashboard', component: Dashboard, meta: { layout: 'main' } },
  { path: '/book', component: Book, meta: { layout: 'main' } },
  { path: '/borrow', component: Borrow, meta: { layout: 'main' } },
  { path: '/student', component: Student, meta: { layout: 'main' } },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
