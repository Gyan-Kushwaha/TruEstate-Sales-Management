import { useState, useEffect } from 'react';
import axios from 'axios';

const useTransactions = () => {
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(false);
    
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        region: [],
        category: [],
        paymentMethod: [],
        startDate: '',
        endDate: ''
    });
    const [sort, setSort] = useState({ sortBy: 'date', sortOrder: 'desc' });
    const [page, setPage] = useState(1);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const params = {
                page,
                search,
                sortBy: sort.sortBy,
                sortOrder: sort.sortOrder,
                region: filters.region.join(','),
                category: filters.category.join(','),
                paymentMethod: filters.paymentMethod.join(','),
                startDate: filters.startDate,
                endDate: filters.endDate
            };

            const response = await axios.get('https://truestate-sales-management-backend.onrender.com/api/transactions', { params });
            setData(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchTransactions();
        }, 500);
        return () => clearTimeout(timeout);
    }, [search, filters, sort, page]);

    return { 
        data, meta, loading, 
        search, setSearch, 
        filters, setFilters, 
        sort, setSort, 
        page, setPage 
    };
};

export default useTransactions;