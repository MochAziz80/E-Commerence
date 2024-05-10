const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cartIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart' // Referensi ke model Cart
    }           
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);