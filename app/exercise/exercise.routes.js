import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
	createNewExercise,
	deleteExercise,
	editExercise,
	getExercises
} from './exercise.controller.js';
import { createNewExerciseLog } from './log/exercise-log.controller.js';
import { getExerciseLog } from './log/get-exercise-log.controller.js';
import {
	completeExerciseLog,
	updateExerciseLogTime
} from './log/update-exercise-log.controller.js';

const router = express.Router();

router.route('/').get(protect, getExercises);

router.route('/').post(protect, createNewExercise);

router.route('/:id').put(protect, editExercise).delete(protect, deleteExercise);

router
	.route('/log/:id')
	.get(protect, getExerciseLog)
	.post(protect, createNewExerciseLog);

router.route('/log/complete/:id').patch(protect, completeExerciseLog);

router.route('/log/time/:id').put(protect, updateExerciseLogTime);

export default router;
