const express = require('express');
const router = express.Router();
const { addCategory, getCategories, updateCategory, deleteCategory, getAllCategories } = require('../controllers/categoryController');

router.get('/', getCategories);

router.post('/', addCategory);

router.put('/:categoryId', updateCategory);

router.delete('/:categoryId', deleteCategory);

router.get('/getallcategories', getAllCategories);

module.exports = router;
