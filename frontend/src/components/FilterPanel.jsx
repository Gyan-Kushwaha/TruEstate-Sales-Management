import React from 'react';

const FilterPanel = ({ filters, setFilters, meta }) => {
    const handleCheckbox = (category, value) => {
        setFilters(prev => {
            const current = prev[category];
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [category]: updated };
        });
    };

    return (
        <div className="bg-white p-4 shadow rounded-lg mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
                <h3 className="font-bold mb-2">Region</h3>
                {meta.regions?.map(r => (
                    <label key={r} className="block text-sm">
                        <input type="checkbox" className="mr-2"
                            checked={filters.region.includes(r)}
                            onChange={() => handleCheckbox('region', r)}
                        /> {r}
                    </label>
                ))}
            </div>

            <div>
                <h3 className="font-bold mb-2">Gender</h3>
                {['Male','Female'].map(g => (
                    <label key={g} className="block text-sm">
                        <input type="checkbox" className="mr-2"
                            checked={filters.gender?.includes(g)}
                            onChange={() => handleCheckbox('gender', g)}
                        /> {g}
                    </label>
                ))}
            </div>

            <div>
                <h3 className="font-bold mb-2">Category</h3>
                {meta.categories?.map(c => (
                    <label key={c} className="block text-sm">
                        <input type="checkbox" className="mr-2"
                            checked={filters.category.includes(c)}
                            onChange={() => handleCheckbox('category', c)}
                        /> {c}
                    </label>
                ))}
            </div>

             <div>
                <h3 className="font-bold mb-2">Date Range</h3>
                <input type="date" className="border p-1 text-sm w-full mb-2" 
                    onChange={(e) => setFilters(prev => ({...prev, startDate: e.target.value}))} />
                <input type="date" className="border p-1 text-sm w-full"
                    onChange={(e) => setFilters(prev => ({...prev, endDate: e.target.value}))} />
            </div>
        </div>
    );
};

export default FilterPanel;