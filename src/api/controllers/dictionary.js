const DictionaryItem = require('../models/dictionary');

createItem = (req, res) => {
    const body = req.body;

	if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an item'
        })
    }

    try {
        const item = new DictionaryItem(body)

        if (item) {
			item
                .save()
                .then(() => {
                    return res
                        .status(201)
                        .json({
                            success: true,
                            id: item._id,
                            message: 'Item created!'
                        })
                })
                .catch(error => {
                    return res
                        .status(400)
                        .json({
                            error,
                            message: 'Item not created!'
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

updateItem = async (req, res) => {
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
        const item = await DictionaryItem.findOne({
            _id: req.params.id
        });

        if (item) {
			item.name = body.name
			item
                .save()
                .then(() => {
                    return res
                        .status(200)
                        .json({
                            success: true,
                            id: item._id,
                            message: 'Item updated!'
                        })
                })
                .catch(error => {
                    return res
                        .status(404)
                        .json({
                            error,
                            message: 'Item not updated!'
                        })
                })
        }
    } catch (error) {
        return res
            .status(404)
            .json({
                error,
                message: 'Update error: there is no item with specified id'
            })
    }
}

deleteItem = async (req, res) => {
    try {
        const item = await DictionaryItem.findOneAndDelete({
            _id: req.params.id
        });

        if (item) {
            return res
                .status(200)
                .json({
                    success: true,
                    data: item
                })
        }

        return res
            .status(404)
            .json({
                success: false,
                error: `Delete error: there is no item with specified id`
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

getItemById = async (req, res) => {
    try {
        const item = await DictionaryItem.findOne({
            _id: req.params.id
        });

        if (item) {
            res
                .status(200)
                .json({
                    success: true,
                    data: item
                });
        }

        return res
            .status(404)
            .json({
                success: false,
                error: `There is no item with specified id`
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

getItems = async (req, res) => {
    const body = req.body;
    const filter = {};

    try {
        const items = await DictionaryItem.find(filter);

        if (items && items.length) {
            return res
                .status(200)
                .json({
                    success: true,
                    data: items
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                info: 'There are no items'
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
    createItem,
    updateItem,
    deleteItem,
    getItems,
    getItemById
}
