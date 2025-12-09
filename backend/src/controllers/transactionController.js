const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
    try {
        const {
            page = 1,
            search = '',
            region,
            gender,
            category,
            paymentMethod,
            startDate,
            endDate,
            sortBy = 'Date',
            sortOrder = 'desc'
        } = req.query;

        const limit = 10;
        const skip = (page - 1) * limit;

        let query = {};
        
       
        if (search) {
            const searchRegex = { $regex: search, $options: 'i' };
            const isNumber = !isNaN(search) && search.trim() !== '';
            
            if (isNumber) {
                query.$or = [
                    { 'Customer Name': searchRegex },
                    { 'Phone Number': Number(search) } 
                ];
            } else {
                query['Customer Name'] = searchRegex;
            }
        }

        if (region) query['Customer Region'] = { $in: region.split(',') };
        if (gender) query['Gender'] = { $in: gender.split(',') };
        if (category) query['Product Category'] = { $in: category.split(',') };
        if (paymentMethod) query['Payment Method'] = { $in: paymentMethod.split(',') };

        
        if (startDate || endDate) {
            query['Date'] = {};
            if (startDate) query['Date'].$gte = new Date(startDate);
            if (endDate) query['Date'].$lte = new Date(endDate);
        }

        const sortOptions = {};
        const sortKeyMap = {
            'date': 'Date',
            'quantity': 'Quantity',
            'customerName': 'Customer Name'
        };
        
        const dbSortKey = sortKeyMap[sortBy] || 'Date';
        sortOptions[dbSortKey] = sortOrder === 'asc' ? 1 : -1;

        const transactions = await Transaction.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        const total = await Transaction.countDocuments(query);
        
        const regions = await Transaction.distinct('Customer Region');
        const categories = await Transaction.distinct('Product Category');
        const genders = await Transaction.distinct('Gender');
        
        
        res.json({
            data: transactions,
            meta: {
                total,
                page: parseInt(page),
                totalPages: Math.ceil(total / limit),
                regions,
                categories,
                genders
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};