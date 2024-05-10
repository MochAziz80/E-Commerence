const Order = require('../models/Order');

const OrderController = {

    /* get all orders (only admin) */
    async get_orders(req, res) {
        try {
            const orders = await Order.find()
                .populate({
                    path: 'userId',
                    select: 'username'
                })
                .populate({
                    path: 'cartIds',
                    populate: {
                        path: 'products.productId',
                        select: 'name image size'
                    }
                });
            res.status(200).json({
                type: "success",
                orders
            });
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            });
        }
    },
    
    


    /* get user's orders */
    async get_order(req, res) {
        try {
            const order = await Order.findOne({ userId: req.params.userId });
    
            if (!order) {
                return res.status(404).json({
                    type: "error",
                    message: "User doesn't exist"
                });
            }
    
            // Ambil array carts dari order
            const carts = order.carts;
    
            // Iterasi melalui setiap item dalam array carts
            const formattedCarts = carts.map(cart => {
                return {
                    cartId: cart.cartId,
                };
            });
    
            res.status(200).json({
                type: "success",
                carts: formattedCarts
            });
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            });
        }
    },
    

    /* add order */
    async create_order(req, res) {
        const newOrder = new Order(req.body);
        try {
            const savedOrder = await newOrder.save();
            res.status(201).json({
                type: "success",
                message: "Order created successfully",
                savedOrder
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },

    /* update order */
    async update_order(req, res) {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true }
            );

                console.log(updatedOrder)
            res.status(200).json({
                type: "success",
                message: "Order updated successfully",
                updatedOrder
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },

    /* delete order */
    async delete_order(req, res) {
        try {
            await Order.findOneAndDelete(req.params.id);
            res.status(200).json({
                type: "success",
                message: "Order has been deleted successfully"
            });
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    }
};

module.exports = OrderController;