const Category = require('../models/category');

const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = new Category({ name });
        await category.save();
        res.status(201).json({ success: true, category });
    } catch (error) {
        res.status(500).json({ message: 'Error adding category', error });
    }
};

const getCategories = async (req, res) => {
    const { page = 1, limit = 4 } = req.query;
    const skip = (page - 1) * limit;

    try {
        const categories = await Category.find()
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }); 

        const totalCategories = await Category.countDocuments();
        const totalPages = Math.ceil(totalCategories / limit);

        res.json({ categories, totalPages });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};



const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 }); // Sort categories by creation date (newest first)
        res.json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};


const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;
    
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.name = name || category.name;
        await category.save();

        res.json({ success: true, category });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
};

// Delete Category
const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};

module.exports = {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    getAllCategories
};

