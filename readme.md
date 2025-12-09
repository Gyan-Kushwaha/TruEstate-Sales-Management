# TruEstate Retail Sales Management System

## 1. Overview

TruEstate is a MERN stack project I built to manage and analyze retail sales data. It’s designed to work with real, messy datasets you’d typically see in production — things like inconsistent field names, typos, and weird spacing. It includes a REST API backend and a responsive frontend where you can search, filter, sort, and view sales details in a clean UI. The architecture is simple to maintain and can scale without turning into spaghetti.

## 2. Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Axios
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (frontend), Render (backend)
- **Tools:** Git, MongoDB Compass

# 3. Search Feature
Search works through MongoDB using regex. The API figures out what the user is typing:
- **Text** → looks up by Customer Name 
- **Numbers** → checks the Phone Number field
Both are combined in an $or query so results stay fast and accurate.

# 4. Filters
Filtering is pretty flexible:
Region and Category allow multiple selections using $in
Date range uses $gte and $lte
Filter dropdowns are not hard-coded — they’re fetched from the database using .distinct() so they always match the actual data.

# 5. Sorting
Sorting is done on the server (not the client) to keep performance solid with large collections. The frontend just sends sortBy and sortOrder, and the backend maps those to the real MongoDB fields before calling .sort().

# 6. Pagination
Pagination is also server-side. It returns 10 records at a time to keep responses snappy.

7. Setup
Install dependencies in both folders: npm install
Add .env in the backend with MongoDB credentials
Start backend: npm start
Start frontend: npm run dev

That’s it — the app will be fully up and running.