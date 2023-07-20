const express = require('express');
const router = express.Router();
const Duty = require('../models/Duty');
const jwtUtils = require('../utils/jwtUtils');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  const userId = jwtUtils.verifyToken(token);
  if (userId) {
    req.userId = userId;
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

// Route to create a new duty
router.post('/', isAuthenticated, async (req, res) => {
  const { title, description, goalId } = req.body;
  try {
    const newDuty = new Duty({ title, description, goalId, userId: req.userId });
    const savedDuty = await newDuty.save();
    res.json(savedDuty);
  } catch (error) {
    res.status(500).json({ message: 'Error creating duty' });
  }
});

// Route to get all duties for a specific goal
router.get('/:goalId', isAuthenticated, async (req, res) => {
  try {
    const duties = await Duty.find({ goalId: req.params.goalId, userId: req.userId });
    res.json(duties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching duties' });
  }
});

// Route to update a duty
router.put('/:dutyId', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  try {
    const updatedDuty = await Duty.findOneAndUpdate(
      { _id: req.params.dutyId, userId: req.userId },
      { title, description },
      { new: true }
    );
    res.json(updatedDuty);
  } catch (error) {
    res.status(500).json({ message: 'Error updating duty' });
  }
});

// Route to delete a duty
router.delete('/:dutyId', isAuthenticated, async (req, res) => {
  try {
    await Duty.findOneAndDelete({ _id: req.params.dutyId, userId: req.userId });
    res.json({ message: 'Duty deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting duty' });
  }
});

module.exports = router;