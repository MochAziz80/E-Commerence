const Product = require('../models/Product');

const ProductController = {
    
    /* get all products */
    async get_products(req, res) {

        const qNew = req.query.new;
        const qCategory = req.query.category;

        try {

            let products;

            if(qNew) {
                products = await Product.find().sort({ createdAt: -1 }).limit(5);
            } else if (qCategory) {
                products = await Product.find({ 
                    categories: {
                        $in: [qCategory]
                    }
                });
            } else {
                products = await Product.find();
            }
            res.status(200).json({
                type: "success",
                products
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },

    /* get single product */
    async get_product(req, res) {
        try {
            const product = await Product.findOne(req.params.name);
            if(!product) {
                res.status(404).json({
                    type: "error",
                    message: "Product doesn't exists"
                })
            } else{
                res.status(200).json({
                    type: "success",
                    product
                })
            }   
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },

    /* create new product */
    async create_product(req, res) {
        try {
            // Validasi bahwa bidang 'price' memiliki nilai positif
            if (req.body.price <= 0) {
                return res.status(400).json({
                    type: "error",
                    message: "Price must be greater than zero"
                });
            }
    
            // Membuat objek produk baru dari data permintaan
            const newProduct = new Product(req.body);
    
            // Menyimpan produk ke dalam database
            const savedProduct = await newProduct.save();
    
            // Memberikan respons dengan data produk yang telah disimpan
            res.status(201).json({
                type: "success",
                message: "Product created successfully",
                savedProduct
            });
        } catch (err) {
            // Menangani kesalahan yang mungkin terjadi selama proses pembuatan produk
            if (err.name === 'ValidationError') {
                res.status(400).json({
                    type: "error",
                    message: err.message
                });
            } else {
                res.status(500).json({
                    type: "error",
                    message: "Something went wrong please try again",
                    err
                });
            }
        }
    },
    
    /* update product */
    async update_product(req, res) {
        const existing = await Product.findById(req.params.id);
        if(!existing){
            res.status(404).json({
                type: "error",
                message: "Product doesn't exists"
            })
        } else {
            try {
                const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                },
                    { new: true }
                );
                res.status(200).json({
                    type: "success",
                    message: "Product updated successfully",
                    updatedProduct
                })
            } catch (err) {
                res.status(500).json({
                    type: "error",
                    message: "Something went wrong please try again",
                    err
                })
            }
        }
    },

    /* delete product */
    async delete_user(req, res) {
        const existing = await Product.findById(req.body.id);
        if (!existing) {
            res.status(200).json({
                type: "error",
                message: "Product doesn't exists"
            })
        } else {
            try {
                await Product.findOneAndDelete(req.body.id);
                res.status(200).json({
                    type: "success",
                    message: "Product has been deleted successfully"
                });
            } catch (err) {
                res.status(500).json({
                    type: "error",
                    message: "Something went wrong please try again",
                    err
                })
            }
        }
    },

    async create_poduk(req, res, next) {

        const newUser = new Product({
            name : req.body.name,
            description: req.body.description,
            image: req.body.image,
            categories: req.body.categories,
            size : req.body.size,
            color : req.body.color,
            price : req.body.price
        });

        try {
            const user = await newUser.save();
            res.status(201).json({
                type : 'success',
                message: "User has been created successfuly",
                user
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },


    
};

module.exports = ProductController;