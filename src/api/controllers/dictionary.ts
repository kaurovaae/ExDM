import DictionaryItem 				from "../models/dictionary";
import {Request, Response}			from "express";

export const createItem = (req: Request, res: Response): void => {
    const body = req.body;

	if (!body) {
        res.status(400).json({
            success: false,
            error: 'You must provide an item'
        });
        return;
    }

    const item = new DictionaryItem(body);

    if (item) {
        item
            .save()
            .then(item => {
                res
                    .status(201)
                    .json({
                        success: true,
                        id: item._id,
                        message: 'Item created!'
                    });
            })
            .catch(error => {
                res
                    .status(400)
                    .json({
                        error,
                        message: 'Item not created!'
                    });
            })
    }
}

export const updateItem = (req: Request, res: Response): void => {
    const body = req.body

    if (!body) {
        res
            .status(400)
            .json({
                success: false,
                error: 'You must provide a body to update'
            });
        return;
    }

    DictionaryItem.findOne({_id: req.params.id})
        .then(item => {
            if (item) {
                item.name = body.name
                item.mfr = body.mfr
                item.measuring = body.measuring
                item.measuringCount = body.measuringCount
                item.dose = body.dose
                return item.save();
            }
        })
        .then(item => {
            res
                .status(200)
                .json({
                    success: true,
                    id: item?._id,
                    message: 'Item updated!'
                });
        })
        .catch(error => {
            res
                .status(400)
                .json({
                    error,
                    message: 'Item not updated!'
                });
        });
}

export const deleteItem = (req: Request, res: Response): void => {
    DictionaryItem.findOneAndDelete({_id: req.params.id})
        .then(item => {
            if (item) {
                res
                    .status(200)
                    .json({
                        success: true,
                        data: item
                    });
                return;
            }

            res
                .status(404)
                .json({
                    success: false,
                    error: `Delete error: there is no item with specified id`
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

export const getItemById = (req: Request, res: Response): void => {
    DictionaryItem.findOne({_id: req.params.id})
        .then(item => {
            if (item) {
                res
                    .status(200)
                    .json({
                        success: true,
                        data: item
                    });
                return;
            }

            res
                .status(404)
                .json({
                    success: false,
                    error: `There is no item with specified id`
                })
        })
        .catch(error => {
            res
                .status(400)
                .json({
                    success: false,
                    error
                })
        });
}

export const getItems = (req: Request, res: Response): void => {
    // const body = req.body;
    const filter = {};

    DictionaryItem.find(filter)
        .then(items => {
            if (items && items.length) {
                res
                    .status(200)
                    .json({
                        success: true,
                        data: items
                    });
                return;
            }

            res
                .status(200)
                .json({
                    success: true,
                    info: 'There are no items'
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
