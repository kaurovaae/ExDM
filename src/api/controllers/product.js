const Product = require('../models/product');

createProduct = (req, res) => {
    const body = req.body;

	if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a product'
        })
    }

    try {
        const product = new Product(body)

        if (product) {
            product
                .save()
                .then(() => {
                    return res
                        .status(201)
                        .json({
                            success: true,
                            id: product._id,
                            message: 'Product created!'
                        })
                })
                .catch(error => {
					console.log("error", error)
                    return res
                        .status(400)
                        .json({
                            error,
                            message: 'Product not created!'
                        })
                })
        }
    } catch (err) {
        return res
            .status(400)
            .json({
                success: false,
                error: err
            })
    }
}

updateProduct = async (req, res) => {
    const body = req.body

    if (!body) {
        return res
            .status(400)
            .json({
                success: false,
                error: 'You must provide a body to update'
            })
    }

    try {
        const product = await Product.findOne({
            _id: req.params.id
        });

        if (product) {
            product.name = body.name
            product.date = body.date || product.date
            product
                .save()
                .then(() => {
                    return res
                        .status(200)
                        .json({
                            success: true,
                            id: product._id,
                            message: 'Product updated!'
                        })
                })
                .catch(error => {
                    return res
                        .status(404)
                        .json({
                            error,
                            message: 'Product not updated!'
                        })
                })
        }
    } catch (error) {
        return res
            .status(404)
            .json({
                error,
                message: 'Update error: there is no product with specified id'
            })
    }
}

deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            _id: req.params.id
        });

        if (product) {
            return res
                .status(200)
                .json({
                    success: true,
                    data: product
                })
        }

        return res
            .status(404)
            .json({
                success: false,
                error: `Delete error: there is no product with specified id`
            })
    } catch (err) {
        return res
            .status(400)
            .json({
                success: false,
                error: err
            })
    }
}

getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id
        });

        if (product) {
            res
                .status(200)
                .json({
                    success: true,
                    data: product
                });
        }

        return res
            .status(404)
            .json({
                success: false,
                error: `There is no product with specified id`
            })
    } catch (err) {
        return res
            .status(400)
            .json({
                success: false,
                error: err
            })
    }
}

getProducts = async (req, res) => {
    const body = req.body;
    const date = body && body.date;
    const filter = date
        ? {date: {$lte: date}}
        : {};

    try {
        const products = await Product.find(filter);

        if (products && products.length) {
            return res
                .status(200)
                .json({
                    success: true,
                    data: products
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                info: date ? 'There are no products with expired date!' : 'There are no products'
            })
    } catch (err) {
        return res
            .status(400)
            .json({
                success: false,
                error: err
            })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById,
}
