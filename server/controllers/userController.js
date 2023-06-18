import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUser = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.params.id,
		},
	});

	if (user === null) {
		res.status(404);
		throw new Error('User tidak ditemukan');
	}

	res.status(200).json({
		code: 200,
		status: 'OK',
		message: 'Berhasil mendapatkan user',
		data: { ...user },
	});
});

export const getAllUsers = asyncHandler(async (req, res) => {
	const user = await prisma.user.findMany();

	res.status(200).json({
		code: 200,
		status: 'OK',
		message: 'Berhasil mendapatkan semua user',
		data: [...user],
	});
});

export const createUser = asyncHandler(async (req, res) => {
	const { email, password, role } = req.body;

	// validasi
	if (!email) {
		res.status(400);
		throw new Error('Email tidak boleh kosong');
	} else if (!password) {
		res.status(400);
		throw new Error('Kata sandi tidak boleh kosong');
	} else if (!email || !password) {
		res.status(400);
		throw new Error('Email dan kata sandi tidak boleh kosong');
	}

	const user = await prisma.user.create({
		data: {
			email,
			password,
			role,
		},
	});

	res.status(201).json({
		code: 201,
		status: 'Created',
		message: 'Berhasil membuat user baru',
		data: {
			...user,
		},
	});
});

export const updateUser = async (req, res) => {
	const { email, password } = req.body;
	const user = await prisma.user.update({
		where: {
			id: req.params.id,
		},
		data: {
			email: email,
			password: password,
		},
	});

	res.status(201).json({
		code: 200,
		status: 'OK',
		message: 'Berhasil mengubah data user',
		data: {
			...user,
		},
	});
};

export const deleteUser = async (req, res) => {
	await prisma.user.delete({
		where: {
			id: req.params.id,
		},
	});

	res.status(200).json({
		code: 200,
		status: 'OK',
		message: 'Berhasil menghapus user',
	});
};

// export const currentUser = asyncHandler(async (req, res) => {
// 	const user = req.user;

// 	res.status(200).json({
// 		code: 200,
// 		status: 'OK',
// 		message: 'Current user',
// 		data: {
// 			...user,
// 		},
// 	});
// });
