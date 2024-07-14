const mongoose = require('mongoose')
const productsModel = require('../models/productsModel')


/**
     getAllProducts,
    getSingleProduct,
    createNewProduct,
    updateProduct,
    deleteProduct
 */

// get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productsModel.find({}).sort({ createdAt: -1 }) // sort by newest
        //   check if there no products
        if (products.length === 0) {
            return res.status(404).json({ message: " No Products Found " })
        }
        // if there is return it
        return res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
// get single product with its ID
const getSingleProduct = async (req, res) => {
    try {
        // get its id
        const { id } = req.params;
        // validate the id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: "No Such ID" })
        }
        // get the post by its id
        const Product = productsModel.findById(id)
        // check if valid product
        if (!Product) {
            res.status(400).json("Not Valid Product")
        }
        // if it's ok return it
        return res.status(200).json(Product)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// create a new product
const createNewProduct = async (req, res) => {
    try {
        // get the input fields
        const { image, title, description, price, priceBeforeDeal, priceOff, stars, numberOfReview, ukSide,
            tags, status } = req.body;
        // destructure status to icon, and name
        const { icon, name } = status;

        // create the product
        const newProduct = await productsModel.create({
            image, title, description, price, priceBeforeDeal, priceOff, stars, numberOfReview, ukSide,
            tags, status: { icon, name }
        })
        // return it
        return res.status(200).json(newProduct)

    } catch (error) {
        // separate each error
        let errorMessage = "";
        if (error.errors) {
            errorMessage = Object.values(error.errors).map(error => error.message).join(",")
        } else {
            errorMessage = error.message;
        }
        res.status(500).json({ error: errorMessage })
    }
}

// update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // validate the id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "No such ID" })
        }
        const updateProduct = await productsModel.findByIdAndUpdate(id , { ...req.body }, { new: true })

        if (!updateProduct) {
            return res.status(400).json({ error: "Couldn't Update the product, make sure you filled the required fields" })
        }

        // alright
        return res.status(200).json(updateProduct)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
// delete product

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // validate the id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "No Such ID" })
        }
        const deleteProductByItsID = await productsModel.findByIdAndUpdate(id)

        // successful
        return res.status(200).json(deleteProductByItsID)
    } catch (error) {
        res.status(500).json({ error: error.message })
    } 
}    
 


module.exports = {
    getAllProducts,
    getSingleProduct,
    createNewProduct,
    updateProduct,
    deleteProduct
}