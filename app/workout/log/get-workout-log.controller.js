import asyncHandler from 'express-async-handler';

import { prisma } from '../../prisma.js';
import { calculateMinutes } from '../calculate-minutes.js';

// @desc Get workout Log
// @route PUT /api/workouts/log/:id
// @access Private

export const getWorkoutLog = asyncHandler(async (req, res) => {
	const workoutLog = await prisma.workoutLog.findUnique({
		where: {
			id: Number(req.params.id)
		},
		include: {
			workout: {
				include: {
					exercises: true
				}
			},
			exerciseLogs: {
				orderBy: {
					id: 'asc'
				},
				include: {
					exercise: true
				}
			}
		}
	});

	if (!workoutLog) {
		res.status(404);
		throw new Error('Workout not found!');
	}

	res.json({
		...workout,
		minutes: calculateMinutes(workoutLog.workout.exercises.length)
	});
});
