const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const result = await sequelize.transaction(async (t) => {
      const allTags = await Tag.findAll({
        include: Product
      }, {
        transaction: t
      });
      res.status(200).json(allTags);
    });
  }
  catch (err) {
    res.status(500).json("Error retrieving tags.");
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const result = await sequelize.transaction(async (t) => {
      const tag = await Tag.findOne({
        where: {
          id: req.params.id
        },
        include: Product
      }, {
        transaction: t
      });
      res.status(200).json(tag);
    });
  }
  catch (err) {
    res.status(500).json("Error retrieving tag.");
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const result = await sequelize.transaction(async (t) => {
      Tag.create(req.body)
        .then((tag) => {res.status(201).json(`Tag created:\n${tag}`)})
        .catch(err => res.status(400).json(err));
    }, {
      transaction: t
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const result = await sequelize.transaction(async (t) => {
      Tag.update(req.body, {
        where: {
          id: req.params.id
        }
      })
        .then((tag) => {
          res.status(200).json(`Tag updated:\n${tag}`)
        })
        .catch(err => res.status(400).json(err));
    }, {
      transaction: t
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const result = await sequelize.transaction(async (t) => {
      await Tag.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(200).json("Tag deleted.");
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
