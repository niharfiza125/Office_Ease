# Office Ease - ERP System

A comprehensive full-stack ERP (Enterprise Resource Planning) web application designed to manage internal operations of a business including inventory, HR, sales, attendance, and finance — built as a semester project for CSE-403L (Database Management Systems Lab) at UET Peshawar.

## 👥 Team Members

* *Fiza Nihar* (22pwcse2100) @niharfiza125
* *Afia Shah* (22pwcse2115)
* *Hafsa Javed* (22pwcse2171) @HafsaJavedPak
* *Instructor*: Engr. Sumayyea Salahuddin

## 🎯 Project Objective

To build a modular, secure, and real-time ERP system that:

* Digitizes core business processes
* Unifies data across modules like HR, Inventory, Sales, Attendance, and Finance
* Provides a user-friendly dashboard for insights and management
* Enforces proper relational database design and backend logic

## 🧰 Tech Stack

| Layer              | Tools/Tech                      |
| ------------------ | ------------------------------- |
| *Frontend*       | React.js, Tailwind CSS, Axios   |
| *Backend*        | Laravel 10, PHP 8+              |
| *Database*       | MySQL 8+                        |
| *Authentication* | JWT, Laravel Middleware         |
| *Dev Tools*      | Postman, Git, VS Code, Composer |
| *Hosting*        | AWS EC2             |

## 🔧 Core Features & Modules

* *Authentication*: Admin login with JWT token-based auth
* *Dashboard*: Stats on employees, stock, purchases, sales, leaves, etc.
* *HR*: Employee, Department, Attendance, and Leave management
* *Inventory*: Categories, Products, Suppliers, Purchases
* *Sales*: Customer records and Sales tracking
* *Finance*: Expense tracking and invoice logic
* *Security*: API protected with auth middleware
* *Validation*: Frontend checks + backend rules
* *Deployment*: Live deployment on EC2
  👉 [Live Demo](http://ec2-34-230-5-141.compute-1.amazonaws.com:3000)
  Username: admin | Password: admin123

## 🗂 Project Structure


Office_Ease/
│
├── frontend/              # React.js Frontend
│   ├── components/        # UI Components and Pages
│   ├── utils/             # API Client
│   └── App.js, etc.
│
├── backend/               # Laravel Backend
│   ├── app/Models/        # Eloquent Models
│   ├── app/Http/Controllers/
│   ├── routes/api.php
│   └── config/cors.php
│
├── database.sql           # MySQL Schema
└── README.md              # Project Overview


## 📌 Database Design Highlights

* Fully normalized up to 3NF
* Foreign key constraints and relational integrity
* Key Tables: employees, departments, products, sales, purchases, attendances, leaves, expenses

## 📈 System Capabilities

* Auto-update inventory on purchases and sales
* Error handling for low stock and missing fields
* Department-wise employee management
* Leave status and attendance by date
* Expense logging for finance module
* Token-based protected API access

## 🚀 Deployment Notes

* Frontend uses .env for dynamic backend base URL (EC2 public DNS)
* Laravel CORS and .env configured for cross-origin support
* Apache/MySQL managed via XAMPP on backend
* Port 3000 (React) and 8000 (Laravel) opened via firewall rules
