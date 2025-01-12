const express = require('express');
const router = express.Router();
const GoalValidation = require('../../validation/goal/setgoalsvalidation');
const { 
    createGoal, 
    getAllGoals, 
    getGoalById, 
    updateGoal, 
    deleteGoal 
} = require('../../controller/goal/setgoalsController');


router.post('/goals',GoalValidation, createGoal);
router.get('/goals', getAllGoals);
router.get('/goals/:id', getGoalById);
router.put('/goals/:id',GoalValidation, updateGoal);
router.delete('/goals/:id', deleteGoal);

module.exports = router;
