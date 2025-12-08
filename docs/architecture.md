# Architecture Document

## 1. Backend Architecture
Built on **Node.js** and **Express** following the **MVC pattern**.
- **Design Decision:** The Mongoose schema uses exact key matching (e.g., `'Customer Name'` with spaces) to align directly with the provided dataset, eliminating the need for CSV pre-processing.
- **Controller:** Acts as the central logic handler, dynamically constructing MongoDB queries based on active filters and search terms.

## 2. Frontend Architecture
A **Single Page Application** using **React (Vite)** and **Tailwind CSS**.
- **State Management:** I avoided external libraries like Redux in favor of a **Custom Hook (`useTransactions`)**. This hook encapsulates all API fetching, debouncing, and pagination logic, keeping the UI components "dumb" and clean.
- **Styling:** Utility-first approach using Tailwind for a lightweight and responsive UI.

## 3. Data Flow
1.  **Trigger:** User updates search/filter.
2.  **State:** Frontend hook updates state (debounced) and fires `useEffect`.
3.  **Request:** Axios sends GET request with params to `/api/transactions`.
4.  **Processing:** Backend Controller builds the query object (using `$regex`, `$in`, `$gte`).
5.  **Response:** MongoDB returns filtered data + pagination metadata.
6.  **Render:** Frontend receives JSON and updates the Table view.

## 4. Folder Structure
The project uses a monorepo structure:
```text
root/
├── backend/
│   ├── controllers/   
│   ├── models/        
│   ├── routes/        
│   └── index.js       
├── frontend/
│   ├── components/    
│   ├── hooks/         
│   └── App.jsx        
└── docs/
    └── architecture.
```   

## 5. Module Responsibilities

1. Backend Modules
- **transactionController.js**: The most complex file. It checks which query params exist and constructs the MongoDB query. It also handles the "text vs number" logic for the Search bar.
- **Transaction.js**: Defines the data model. It also includes a text index on "Customer Name" to make search faster.
- **transactionRoutes.js**: A simple router that maps the URL /transactions to the controller.

2. Frontend Modules
- **useTransactions.js**: Handles side effects (API calls) and state. It ensures the UI doesn't freeze by using useEffect and debouncing.
- **FilterPanel.jsx**: Handles the UI for checkboxes and date inputs. It relies on the parent to pass down the state setter functions.
- **TransactionTable.jsx**: A "dumb" component. It simply takes data as a prop and displays it. It handles the edge case of empty data.