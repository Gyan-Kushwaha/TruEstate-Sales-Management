import React from 'react';

const TransactionTable = ({ data, loading }) => {
    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (!data || data.length === 0) return <div className="text-center p-4">No results found.</div>;

    return (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 uppercase">
                    <tr>
                        <th className="px-6 py-3">Customer</th>
                        <th className="px-6 py-3">Phone</th>
                        <th className="px-6 py-3">Region</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Product</th>
                        <th className="px-6 py-3">Qty</th>
                        <th className="px-6 py-3">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">{item['Customer Name']}</td>
                            <td className="px-6 py-4">{item['Phone Number']}</td>
                            <td className="px-6 py-4">{item['Customer Region']}</td>
                            <td className="px-6 py-4">
                                {item['Date'] ? new Date(item['Date']).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="px-6 py-4">{item['Product Name']}</td>
                            <td className="px-6 py-4">{item['Quantity']}</td>
                            <td className="px-6 py-4">${item['Total Amount']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;