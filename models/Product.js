const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        unique: false
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: Array,
        required: false
    },
    categories: {
        type: Array,
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
);

ProductSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ProductSchema.set('toJSON', {
    virtuals: true,
});


exports.Product = mongoose.model('Product', ProductSchema);