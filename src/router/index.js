import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Book from "../views/book.vue";
import Student from "../views/student.vue";
import Borrow from "../views/Borrow.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/book", component: Book },
  { path: "/student", component: Student },
  { path: "/borrow", component: Borrow },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
