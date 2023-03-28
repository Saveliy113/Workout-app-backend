import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

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

export default router;
