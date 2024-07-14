const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    image: [String],
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    priceBeforeDeal: {
        type: Number,
        required: [true, "Price Before deal is required to hook the user"],
    },
    priceOff: {
        type: Number,
        required: [true, "Price Off is required to hook the user"],
    },
    stars: {
        type: Number,
        default: 0,
    },
    numberOfReview: {
        type: Number,
        default: 0,
    },
    ukSide: [String],
    tags: {
        type: [String],
    },
    status: {
        icon: {
            type: String,
            required: [true, "Status Icon is required"]
        },

        name: {
            type: String,
            required: [true, "Status Name is required"]
        },

    }
}, { timestamps: true })
// let's add the timestamp to enable createdAt, and _id

module.exports = mongoose.model("productsModel", productSchema)