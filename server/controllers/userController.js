import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

export const registerUser = asyncHandler(async (req, res) => {
	const { nama, email, password } = req.body;

	const emailAvailability = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	// validasi
	if (!nama && !email && !password) {
		res.status(400);
		throw new Error('Semua kolom harus diisi!');
	} else if (!nama) {
		res.status(400);
		throw new Error('Kolom Nama harus diisi!');
	} else if (!email) {
		res.status(400);
		throw new Error('Kolom Email harus diisi!');
	} else if (!password) {
		res.status(400);
		throw new Error('Kolom Password harus diisi!');
	} else if (emailAvailability) {
		res.status(400);
		throw new Error('Email sudah digunakan!');
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
			profil: {
				create: {
					nama,
				},
			},
		},
		include: {
			profil: true,
		},
	});

	res.status(201).json({
		code: 201,
		status: 'Created',
		message: 'Pendaftaran berhasil',
		data: {
			...user,
		},
	});
});

export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email && !password) {
		res.status(400);
		throw new Error('Semua kolom harus diisi!');
	} else if (!email) {
		res.status(400);
		throw new Error('Kolom Email harus diisi!');
	} else if (!password) {
		res.status(400);
		throw new Error('Kolom Password harus diisi!');
	}

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
		include: {
			profil: true,
		},
	});

	if (user && (await bcrypt.compare(password, user.password))) {
		const accessToken = jwt.sign(
			{
				id: user.id,
				nama: user.profil.nama,
				email: user.email,
				role: user.role,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '1h' },
		);

		res.status(200).json({ accessToken });
	} else {
		res.status(401);
		throw new Error('Email atau password salah!');
	}

	res.status(200).json({
		code: 200,
		status: 'OK',
		message: 'Login',
	});
});

export const currentUser = asyncHandler(async (req, res) => {
	const user = req.user;

	res.status(200).json({
		code: 200,
		status: 'OK',
		message: 'Current user',
		data: {
			...user,
		},
	});
});
