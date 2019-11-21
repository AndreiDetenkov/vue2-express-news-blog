const express = require('express');
const Category = require('../models/category');

const createRouter = () => {
	const router = express.Router();

	router.get('/list', async (req, res) => {
		try {
			const categories = await Category.find();
			if (categories) {
				res.send(categories);
			}
		} catch (error) {
			return res.status(500).send({message: 'Not found any categories'});
		}
	});

	router.post('/add', async(req, res) => {
		const title = req.body.title;
		if (title === '') {
			return res.status(400).send({message: 'Please fill the gap - title'});
		}

		try {
			const isCategoryExist = await Category.findOne({title});
			if (isCategoryExist) res.status(400).send({error: 'This category already exist.'});
			else {
				try {
					const category = new Category(req.body);
					const newCategory = await category.save();
					if (newCategory) res.send({message: "The Category added successfully."});
				} catch (e) {
					return res.status(400).send({error: 'Error. Unable to add category.'})
				}
			}
		} catch (e) {
			return res.status(400).send({error: e});
		}
	});

	return router;
};

module.exports = createRouter;
