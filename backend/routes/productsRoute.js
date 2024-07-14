const express = require('express')

const {
    getAllProducts,
    getSingleProduct,
    createNewProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productsController')

const router = express.Router()



// get all products
router.get('/', getAllProducts)

// get a single products with it's ID
router.get('/:id', getSingleProduct)

// create a new product
router.post('/', createNewProduct)

// update a product
router.put('/:id', updateProduct)

// delete product
router.delete('/:id', deleteProduct)

module.exports = router;