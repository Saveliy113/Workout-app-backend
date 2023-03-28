import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
	createNewExercise,
	deleteExercise,
	editExercise,
	getExercises
} from './exercise.controller.js';

const router = express.Router();

router.route('/').get(protect, getExercises);
router.route('/').post(protect, createNewExercise);
router.route('/:id').put(protect, editExercise).delete(protect, deleteExercise);

export default router;
