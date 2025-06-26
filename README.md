# 📚 Community Library Management System (LMS)

The Community Library Management System (LMS) is a web-based platform designed to help a mid-sized town library digitize its book and member management processes. It replaces manual tracking methods (like paper forms and Excel) with a modern, user-friendly system.

This system was developed by a group of junior developers within 3 weeks using modern technologies and Agile Scrum methodology.

---

## 📌 Key Features

- User registration and login for Admin and Members  
- Book management (Add / Edit / Delete by Admin)  
- Member registration (Admin only)  
- Book borrowing and returning  
- Borrowing history view (for both Admin and Members)  
- Book availability tracking  
- Role-Based Access Control (RBAC)

---

## 🛠️ Technologies Used

| Layer         | Technologies                  |
|---------------|-------------------------------|
| Frontend      | Vue.js 3, TailwindCSS          |
| Backend       | Node.js, Express               |
| Database      | MySQL                          |
| UI/UX Design  | Figma                          |
| Version Control | Git, GitHub                 |
| Project Management | Trello / Notion          |

---

## 👥 User Roles

### Admin  
- Manage books (create, edit, delete)  
- Register members  
- Borrow/return books  
- View all member borrowing history  

### Member  
- Browse books  
- Borrow/return books  
- View own borrowing history  

---

## 🗄️ Database Structure

- ERD Diagram: `docs/ERD.pdf`

### Main Tables:
- `users` (Admin / Member)  
- `books`  
- `members`  
- `borrow_records`

---

## 🧪 Test Accounts

| Role   | UserName            | Password    |
|--------|---------------------|-------------|
| Admin  | liberian1           | password123 |


---

## 💻 Local Development Setup

### ✅ Backend

```bash
cd backend
npm install
touch .env
