import Product						from "../models/product";
import {Request, Response}			from "express";

export const createProduct = (req: Request, res: Response): void => {
    const body = req.body;

	if (!body) {
        res
			.status(400)
			.json({
				success: false,
				error: 'You must provide a product'
			});
        return;
    }

    const product = new Product(body);

    if (product) {
        product
            .save()
            .then(product => {
                res
                    .status(201)
                    .json({
                        success: true,
                        id: product._id,
                        message: 'Product created!'
                    })
            })
            .catch(error => {
                res
                    .status(400)
                    .json({
                        error,
                        message: 'Product not created!'
                    })
            });
    }
}

export const updateProduct = (req: Request, res: Response): void => {
    const body = req.body;

    if (!body) {
        res
            .status(400)
            .json({
                success: false,
                error: 'You must provide a body to update'
            });
        return;
    }

    Product.findOne({_id: req.params.id})
        .then(product => {
            if (product) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                product.name = body.name;
                product.date = body.date || product.date;
                return product.save();
            }
        })
        .then(product => {
            res
                .status(200)
                .json({
                    success: true,
                    id: product?._id,
                    message: 'Product updated!'
                });
        })
        .catch(error => {
            res
                .status(400)
                .json({
                    error,
                    message: 'Product not updated!'
                });
        });
}

export const deleteProduct = (req: Request, res: Response): void => {
    Product.findOneAndDelete({_id: req.params.id})
        .then(product => {
            if (product) {
                res
                    .status(200)
                    .json({
                        success: true,
                        data: product
                    });
                return;
            }

            res
                .status(404)
                .json({
                    success: false,
                    error: `Delete error: there is no product with specified id`
                });
        })
        .catch(error => {
            res
                .status(400)
                .json({
                    success: false,
                    error
                });
        });
}

export const getProductById = (req: Request, res: Response): void => {
    Product.findOne({_id: req.params.id})
        .then(product => {
            if (product) {
                res
                    .status(200)
                    .json({
                        success: true,
                        data: product
                    });
                return;
            }

            res
                .status(404)
                .json({
                    success: false,
                    error: `There is no product with specified id`
                });
        })
        .catch(error => {
            res
                .status(400)
                .json({
                    success: false,
                    error
                });
        });
}

export const getProducts = (req: Request, res: Response): void => {
    const body = req.body;
    const date = body && body.date;
    const filter = date
        ? {date: {$lte: date}}
        : {};

    Product.find(filter)
        .then(products => {
            if (products && products.length) {
                res
                    .status(200)
                    .json({
                        success: true,
                        data: products
                    });
                return;
            }

            res
                .status(200)
                .json({
                    success: true,
                    info: date ? 'There are no products with expired date!' : 'There are no products'
                });
        })
        .catch(error => {
            res
                .status(400)
                .json({
                    success: false,
                    error
                });
        });
}
