import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
	createNewExercise,
	deleteExercise,
	editExercise,
	getExercises
} from './exercise.controller.js';
import { createNewExerciseLog } from './log/exercise-log.controller.js';

const router = express.Router();

router.route('/').get(protect, getExercises);
router.route('/').post(protect, createNewExercise);
router.route('/:id').put(protect, editExercise).delete(protect, deleteExercise);
router.route('/log/:exerciseId').post(protect, createNewExerciseLog);

export default router;
