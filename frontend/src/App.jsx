import React, { useState } from 'react';
import useTransactions from './hooks/useTransaction'
import TransactionTable from './components/TransactionTable';
import FilterPanel from './components/FilterPanel';

function App() {
  const { 
    data, meta, loading, 
    search, setSearch, 
    filters, setFilters, 
    sort, setSort, 
    page, setPage 
  } = useTransactions();

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1
          className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          TruEstate Sales Management
        </h1>
      </header>


      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
        <input 
          type="text" 
          placeholder="Search by Name or Phone..." 
          className="p-2 border rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2">
            <select 
                className="p-2 border rounded"
                onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    setSort({ sortBy, sortOrder });
                }}
            >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="quantity-desc">Highest Quantity</option>
                <option value="customerName-asc">Name (A-Z)</option>
            </select>

            <button 
                className="px-4 py-2 bg-black text-white rounded hover:cursor-pointer hover:bg-gray-500"
                onClick={() => setShowFilters(!showFilters)}
            >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
        </div>
      </div>

      {showFilters && (
        <FilterPanel filters={filters} setFilters={setFilters} meta={meta} />
      )}

      <TransactionTable data={data} loading={loading} />

      <div className="flex justify-between items-center mt-6">
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50  bg-black text-white hover:cursor-pointer hover:bg-gray-500 "
          >
              Previous
          </button>
          <span className="text-sm">Page {page} of {meta.totalPages || 1}</span>
          <button 
            disabled={page === meta.totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50  bg-black text-white hover:cursor-pointer hover:bg-gray-500"
          >
              Next
          </button>
      </div>
    </div>
  );
}

export default App;