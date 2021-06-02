const express = require('express')
const Product = require('../model/Product')

const auth = require('../middleware/auth');
const admin = require('../middleware/admin')

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.send(products)
})


router.get("/:id", async (req,res) =>{
    const productId = (req.params.id);
    const product = await Product.findById(productId)
    if(product) {res.send(product)}
    else res.status(400).send({msg: "products not found"})
});


router.post('/', async (req, res) => {
    const products = new Product({
        name:req.body.name,
        category:req.body.category,
        image: req.body.image,
        price:req.body.price,
        brand: req.body.brand,
        countInStock: req.body.countInStock,


    });

    const newProduct = await products.save();

    if(newProduct){
       return res.send(201).send({msg: 'New products created', data: newProduct})
    } return res.status(500).send({msg: 'Error in creating products'})
})


router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findOne({_id: productId})
    if(product){
        product.name=req.body.name;
        product.category=req.body.category;
        product.image= req.body.image;
        product.price=req.body.price;
        product.brand= req.body.brand;
        product.countInStock= req.body.countInStock;

        const updatedProduct = await product.save();

    if(updatedProduct){
       return res.send(200).send({msg: 'Product updated', data: updatedProduct})
    } return res.status(500).send({msg: 'Error in updating products'})

    }


})



router.delete('/:id',  (req, res) =>{
    Product.findByIdAndRemove(req.params.id).exec(),
    function(err){
        if(!err) {
            return res.send('Product deleted')
        } else return res.send('Product deleted')
    }
});
module.exports = router;