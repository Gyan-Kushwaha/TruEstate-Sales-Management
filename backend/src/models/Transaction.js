const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    'Transaction ID': Number,
    'Date': Date,
    'Customer ID': String,
    'Customer Name': String,
    'Phone Number': Number, 
    'Gender': String,
    'Age': Number,
    'Customer Region': String,
    'Customer Type': String,
    'Product ID': String,
    'Product Name': String,
    'Brand': String,
    'Product Category': String,
    'Tags': String, 
    'Quantity': Number,
    'Price per Unit': Number,
    'Discount Percentage': Number,
    'Total Amount': Number,
    'Final Amount': Number,
    'Payment Method': String,
    'Order Status': String,
    'Delivery Type': String,
    'Store ID': String,
    'Store Location': String
}, { collection: 'transactions' }); 

transactionSchema.index({ 'Customer Name': 'text' });

module.exports = mongoose.model('Transaction', transactionSchema);