# 🛒 MERN Stack E-Commerce Platform

## 📖 Project Overview

This project is a **comprehensive E-Commerce web application** built with the MERN Stack (MongoDB, Express.js, React, and Node.js), styled using **Tailwind CSS**, with global state management powered by **Redux Toolkit** and **RTK Query**. The app includes secure user authentication and authorization using **JSON Web Tokens (JWT)**.

The platform supports **two types of users**:  
- **Authenticated users (customers)**
- **Administrators**

Unauthenticated visitors can browse the entire product catalog, view product details, filter by category, brand, and price — but must log in to perform actions like placing orders or submitting reviews.

Once logged in, users can:
- View all available products
- Mark products as favorites and view them on a dedicated favorites page
- View detailed product pages, including:
  - Images
  - Description
  - Price
  - Brand
  - Reviews
  - Quantity and stock status
  - Related products
- Submit product reviews and ratings
- Add products to the shopping cart
- Modify item quantities or remove items from the cart
- Proceed to checkout by entering:
  - Shipping address (address, city, postal code, country)
  - Payment method (PayPal)
- View a complete **order summary**, including:
  - Item prices
  - Shipping costs
  - Taxes
  - Total amount
- Complete the order using PayPal (credit or debit card)
- View their profile and update personal information
- Access their order history, with:
  - Product details
  - Order date
  - Total price
  - Payment and delivery status
  - Full order breakdown

For **administrators**, the navigation differs and includes access to an **Admin Dashboard** with full control over:

- Users: view, update (email, username), and delete
- Orders: view all, track delivery/payment status, and mark orders as delivered
- Categories: create, update, delete, and manage all product categories
- Products: create new products (with image, name, price, quantity, brand, description, stock count, and category), update and delete existing ones

The platform is built to be scalable, secure, and user-friendly — offering a full-featured shopping experience with administrative control capabilities.

---

## ✨ Features

- User Authentication (JWT)
- Admin and Regular User Roles
- Product Management (CRUD)
- Category Management (CRUD)
- Cart and Checkout with PayPal Integration
- Reviews and Ratings System
- Favorites (Wishlist)
- Filtering by Category, Brand, and Price
- Order History and Details
- Admin Dashboard with User, Order, Product and Category Control
- Responsive UI with Tailwind CSS

---

## 🧰 Tech Stack

- **Frontend:** React, Tailwind CSS, Redux Toolkit, RTK Query
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Token (JWT)
- **Payment:** PayPal API
- **State Management:** Redux Toolkit + Redux Query
- **Deployment:** Docker / Render / Vercel (adjust as needed)

---
