import Category from '../models/categoryModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: 'Name is Required' });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.json({ error: 'Category Already Exists' });
    }

    const category = await new Category({ name }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({ error: 'Category Does not Exists' });
    }

    category.name = req.body.name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200).json(removed);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id});
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

export { createCategory, updateCategory, removeCategory, listCategory, readCategory };
