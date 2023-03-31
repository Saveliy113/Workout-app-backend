import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

import { getWorkoutLog } from './log/get-workout-log.controller.js';
import { updateCompleteWorkoutLog } from './log/update-workout-log.controller.js';
import { createNewWorkoutLog } from './log/workout-log.controller.js';
import {
	createNewWorkout,
	deleteWorkout,
	editWorkout,
	getWorkout,
	getWorkouts
} from './workout.controller.js';

const router = express.Router();

router.route('/').get(protect, getWorkouts);
router.route('/').post(protect, createNewWorkout);
router
	.route('/:id')
	.get(protect, getWorkout)
	.put(protect, editWorkout)
	.delete(protect, deleteWorkout);

router
	.route('/log/:id')
	.get(protect, getWorkoutLog)
	.post(protect, createNewWorkoutLog);

router.route('/log/complete/:id').patch(protect, updateCompleteWorkoutLog);
export default router;
