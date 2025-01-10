const express = require('express');
const router = express.Router();
const { 
    createGoal, 
    getAllGoals, 
    getGoalById, 
    updateGoal, 
    deleteGoal 
} = require('../../controller/goal/setgoalsController');


router.post('/goals', createGoal);
router.get('/goals', getAllGoals);
router.get('/goals/:id', getGoalById);
router.put('/goals/:id', updateGoal);
router.delete('/goals/:id', deleteGoal);

module.exports = router;
