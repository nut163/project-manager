const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { check, validationResult } = require('express-validator');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get a project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create a new project
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, category, teamMembers } = req.body;

  try {
    let project = new Project({
      name,
      category,
      teamMembers
    });

    project = await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update a project
router.put('/:id', async (req, res) => {
  const { name, category, teamMembers } = req.body;

  const projectFields = {};
  if (name) projectFields.name = name;
  if (category) projectFields.category = category;
  if (teamMembers) projectFields.teamMembers = teamMembers;

  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: projectFields },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    await Project.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Project removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;