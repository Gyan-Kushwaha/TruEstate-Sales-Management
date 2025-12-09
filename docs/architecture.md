# Architecture Document

## 1. Backend

The backend is built with Node.js and Express and follows a simple MVC structure.
One important decision: instead of cleaning or renaming fields from the dataset, the database schema uses the exact same keys (even ones with spaces like "Customer Name"). This saves time and avoids any preprocessing step.

The controller is where most of the logic lives. It looks at whatever filters or search values are active and then builds the right MongoDB query on the fly.


## 2. Frontend

The frontend is a single-page app created with React (using Vite) and styled with Tailwind CSS.
For state management, I skipped Redux — it felt unnecessary here. Instead, everything related to fetching data, debouncing search input, pagination, etc., is handled inside a custom hook called useTransactions. Components only worry about displaying UI, not business logic.

Tailwind keeps the styling quick and consistent without a lot of custom CSS.

## 3. How Data Moves Through the App

1. The user types something or changes a filter.
2. The custom hook updates its state and triggers a debounced request.
3. A GET request is sent to /api/transactions with all active parameters.
4. The backend builds a MongoDB query using those filters and search terms.
5. The database returns the matching records plus pagination details.
6. The table on the frontend updates with the latest results.

## 4. Folder Structure
The project uses a monorepo structure:
<!-- for this i took help from internet how to write folder structure like this then i write and some of the folder i created as you mention in assignment pdf for this even it is not used-->
```text
root/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── package-lock.json
│
└── docs/
|    └── architecture.md
|       
└── readme.md/
```   

## 5. Module Responsibilities

1. Backend

- **transactionController.js**: Builds queries depending on which filters are being used, and handles the difference between text search and number search.
- **Transaction.js**: Defines the schema and includes a text index to speed up searching by customer name.
- **transactionRoutes.js**: Maps incoming requests to the controller functions.

2. Frontend

- **useTransactions.js**: Handles all side effects like API calls, debouncing, pagination, and syncing filters/search with the backend.
- **FilterPanel.jsx**: Displays checkboxes, date inputs, etc. It doesn’t manage heavy logic — it just updates state coming from the hook.
- **TransactionTable.jsx**: Receives data and renders it. Also handles the case where there’s nothing to show.