const Cart = require('../models/Cart');



const CartController = {

    /* get all carts (only admin) */
    async get_carts(req, res) {
        try {
            const carts = await Cart.find().populate('cartId');
            res.status(200).json({
                type: "success",
                carts
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },

    async get_cart  (req, res) {
        try {
            // Pastikan pengguna telah terotentikasi sebelum mengakses keranjang belanja
            if (!req.user) {
                return res.status(401).json({
                    type: "error",
                    message: "Unauthorized access"
                });
            }
    
            const userId = req.user.id;
            
            // Dapatkan keranjang belanja yang terkait dengan pengguna yang saat ini terotentikasi
            const userCarts = await Cart.find({ userId }).populate({
                path: 'products.productId',
                select: 'name price' 
            });
    

            console.log(userCarts)

    
            res.status(200).json({
                type: "success",
                carts: userCarts
            });
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong, please try again",
                err
            });
        }
    },
    

    
    

    /* add product to cart */
    async create_cart(req, res) {
        const newCart = new Cart(req.body);
        
        try {
            // Pastikan pengguna sudah terotentikasi sebelum mencoba membuat keranjang belanja
            if (!req.user) {
                return res.status(401).json({
                    type: "error",
                    message: "Unauthorized access"
                });
            }
    
            // Ambil ID pengguna dari properti `req.user.id`
            const userId = req.user.id;
    
            // Tetapkan ID pengguna ke keranjang belanja yang baru dibuat
            newCart.userId = userId;
    
            // Simpan keranjang belanja baru ke dalam database
            const savedCart = await newCart.save();
            
            res.status(201).json({
                type: "success",
                message: "Product added successfully",
                savedCart
            });
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            });
        }
    },
    

    /* update product */
    async update_cart(req, res) {
        try {
            const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true }
            );
            res.status(200).json({
                type: "success",
                message: "Cart updated successfully",
                updatedCart
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },

    /* delete cart */
    /* delete cart */
async delete_cart(req, res) {
    try {
        // Pastikan pengguna telah terotentikasi sebelum menghapus keranjang belanja
        if (!req.user) {
            return res.status(401).json({
                type: "error",
                message: "Unauthorized access"
            });
        }

        // Cari keranjang belanja berdasarkan ID dan ID pengguna
        const userId = req.user.id;
        const cartId = req.params.id;

        const cart = await Cart.findOne({ _id: cartId, userId });

        // Jika keranjang belanja tidak ditemukan
        if (!cart) {
            return res.status(404).json({
                type: "error",
                message: "Cart not found"
            });
        }

        // Hapus keranjang belanja dari database
        await cart.remove();

        res.status(200).json({
            type: "success",
            message: "Cart has been deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong, please try again",
            err
        });
    }
}

};

module.exports = CartController;