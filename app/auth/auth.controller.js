import { faker } from '@faker-js/faker';
import { hash, verify } from 'argon2';
import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';
import { userFields } from '../utils/user.utils.js';

import { generateToken } from './generate-token.js';

// @desc Auth user
// @route Auth user POST /api/users/login
// @access Public

export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await prisma.user.findUnique({
		where: {
			email
		}
	});

	const isPasswordCorrect = await verify(user.password, password);

	if (user && isPasswordCorrect) {
		const token = generateToken(user.id);
		res.json({ user, token });
	} else {
		res.status(401);
		throw new Error('Email and password are not correct');
	}

	res.json(user);
});

// @desc Register user
// @route Auth user POST /api/users/register
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const isUserExist = await prisma.user.findUnique({
		where: {
			email
		}
	});

	if (isUserExist) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name: faker.name.fullName()
		},
		select: userFields
	});

	const token = generateToken(user.id);

	res.json({ user, token });
});
