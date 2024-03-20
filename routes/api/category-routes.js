const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
    })
    res.json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    })
    if (category) {
      res.json(category)
    } else {
      res.status(404).send('Category not found')
    }
  } catch (err) {
    res.status(400).json(err);
  }
})

router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.status(200).json(category)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const [affectedCount] = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedCount > 0) {
      const updatedCategory = await Category.findOne({
        where: {
          id: req.params.id,
        },
      })
      res.status(200).json(updatedCategory)
    } else {
      res.status(404).send('Category not found')
    }
  } catch (err) {
    res.status(400).json(err)
  }
})


router.delete('/:id', async (req, res) => {
  try {
    const affectedRows = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
