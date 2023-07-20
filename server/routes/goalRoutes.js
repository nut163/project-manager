const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// Get all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one goal
router.get('/:id', getGoal, (req, res) => {
  res.json(res.goal);
});

// Create one goal
router.post('/', async (req, res) => {
  const goal = new Goal({
    title: req.body.title,
    priority: req.body.priority
  });

  try {
    const newGoal = await goal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one goal
router.patch('/:id', getGoal, async (req, res) => {
  if (req.body.title != null) {
    res.goal.title = req.body.title;
  }
  if (req.body.priority != null) {
    res.goal.priority = req.body.priority;
  }
  try {
    const updatedGoal = await res.goal.save();
    res.json(updatedGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one goal
router.delete('/:id', getGoal, async (req, res) => {
  try {
    await res.goal.remove();
    res.json({ message: 'Deleted Goal' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function for get by ID
async function getGoal(req, res, next) {
  let goal;
  try {
    goal = await Goal.findById(req.params.id);
    if (goal == null) {
      return res.status(404).json({ message: 'Cannot find goal' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.goal = goal;
  next();
}

module.exports = router;