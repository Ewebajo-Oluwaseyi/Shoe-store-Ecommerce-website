const express = require('express')
const Cart = require('../model/Cart')
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth , async (req, res) => {
    const carts = await Cart.find({user: req.user.id}).sort({date: -1}) ;

    res.json(carts)
})


/*router.get("/:id", async (req,res) =>{
    const productId = (req.params.id);
    const product = await Product.findById(productId)
    if(product) {res.send(product)}
    else res.status(400).send({msg: "products not found"})
});*/


router.post('/', auth , async (req, res) => {
    console.log(req.body)
    const carts = new Cart({
        name:req.body.name,
        category:req.body.category,
        image: req.body.image,
        price:req.body.price,
        brand: req.body.brand,
        countInStock: req.body.countInStock,
        qty: req.body.qty,
        productId: req.body.productId,
        user: req.user.id

    });

    const newCart = await carts.save();
    console.log(newCart)
    if(newCart){
       return res.send(201).send({msg: 'New carts created', data: newCart})
    } return res.status(500).send({msg: 'Error in creating products'})
})


router.put('/:id', async (req, res) => {
    const cartId = req.params.id;
    const cart = await Cart.findOne({_id: cartId})
    console.log(cart)
    if(cart){
        cart.name=req.body.name;
        cart.category=req.body.category;
        cart.image= req.body.image;
        cart.price=req.body.price;
        cart.brand= req.body.brand;
        cart.countInStock= req.body.countInStock;
        cart.productId= req.body.productId
        cart.qty = req.body.qty

        const updatedCart = await cart.save();

        res.json(updatedCart)

    if(updatedCart){
        return res.send(201).send({msg: 'cart updated', data: updatedCart})
    } return res.status(500).send({msg: 'Error in updating cart'})

    }


})



router.delete('/:id',  (req, res) =>{
    Cart.findByIdAndRemove(req.params.id).exec(),
    function(err){
        if(!err) {
            return res.send('cart deleted')
        } else return res.send('cart deleted')
    }
});
module.exports = router;