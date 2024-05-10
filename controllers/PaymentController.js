const Cart = require('../models/Cart');

 const PaymentController = {
//     async calculateTotal(req, res) {
//         try {
//             const { userId } = req.params; // Ambil userId dari params URL
            
//             const cart = await Cart.findOne({ userId }).populate('products.productId');
    
//             if (!cart) {
//                 return res.status(404).json({
//                     type: 'error',
//                     message: 'Cart not found'
//                 });
//             }

//             let total = 0;
//             for (const item of cart.products) {
//                 total += item.productId.price * item.quantity;
//             }

//             res.status(200).json({
//                 type: 'success',
//                 total
//             });
//         } catch (error) {
//             console.error('Error calculating total:', error);
//             res.status(500).json({
//                 type: 'error',
//                 message: 'Something went wrong while calculating total',
//                 error
//             });
//         }
//     }
};

module.exports = PaymentController;
