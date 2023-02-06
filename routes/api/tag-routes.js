const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
      const allTags = await Tag.findAll({
        include: [{
          model: Product,
          attributes: ["product_name", "price", "stock"],
          through: {attributes: []}
        }]
      });
      res.status(200).json(allTags);
    });

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
      const tag = await Tag.findOne({
        where: {
          id: req.params.id
        },
        include: [{
          model: Product,
          attributes: ["product_name", "price", "stock"],
          through: {attributes: []}
        }]
      });
      res.status(200).json(tag);
    });

router.post('/', async (req, res) => {
  // create a new tag
      Tag.create(req.body)
        .then((tag) => {res.status(201).json(`Tag created:\n${tag}`)})
        .catch(err => res.status(400).json(err));
    });

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
      Tag.update(req.body, {
        where: {
          id: req.params.id
        }
      })
        .then((tag) => {
          res.status(200).json(`Tag updated:\n${tag}`)
        })
        .catch(err => res.status(400).json(err));
    });

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
      await Tag.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(200).json("Tag deleted.");
    });

module.exports = router;
