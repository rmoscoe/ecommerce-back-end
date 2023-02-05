const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const result = await sequelize.transaction(async (t) => {
      const allCategories = await Category.findAll({
        include: Product
      }, {
        transaction: t
      });
      res.status(200).json(allCategories);
    });
  }
  catch (err) {
    res.status(500).json("Error retrieving categories.");
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const result = await sequelize.transaction(async (t) => {
      const category = await Category.findOne({
        where: {
          id: req.params.id
        },
        include: Product
      }, {
        transaction: t
      });
      res.status(200).json(category);
    });
  }
  catch (err) {
    res.status(404).json("Category not found.");
  }
});

router.post('/', async (req, res) => {
  // create a new category
      Category.create(req.body, {
        include: Product
      })
        .then((category) => {
          res.status(201).json(`Category created:\n${category}`);
        })
        .catch(err => res.status(500).json("Category could not be created."));
    });

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
      Category.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then((category) => {res.status(200).json(`Category updated:\n${category}`)})
      .catch(err => res.status(500).json(err));
    });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
      await Category.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(200).json("Category deleted.");
    });

module.exports = router;
