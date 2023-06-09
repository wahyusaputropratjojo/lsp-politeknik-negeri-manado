import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

const prisma = new PrismaClient();

export const register = asyncHandler(async (req, res) => {
  const { nama, email, password } = req.body;

  const emailAvailability = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // validasi
  if (!nama && !email && !password) {
    res.status(400);
    throw new Error("Semua kolom harus diisi!");
  } else if (!nama) {
    res.status(400);
    throw new Error("Kolom Nama harus diisi!");
  } else if (!email) {
    res.status(400);
    throw new Error("Kolom Email harus diisi!");
  } else if (!password) {
    res.status(400);
    throw new Error("Kolom Password harus diisi!");
  } else if (emailAvailability) {
    res.status(400);
    throw new Error("Email sudah digunakan!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      profil: {
        create: {
          nama,
        },
      },
    },
  });

  res.status(201).json({
    code: 201,
    status: "Created",
    message: "Pendaftaran berhasil",
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    res.status(400);
    throw new Error("Semua kolom harus diisi!");
  } else if (!email) {
    res.status(400);
    throw new Error("Kolom Email harus diisi!");
  } else if (!password) {
    res.status(400);
    throw new Error("Kolom Password harus diisi!");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await prisma.auth.create({
      data: {
        id_user: user.id,
        token: refreshToken,
      },
    });

    res.cookie("REFRESH_TOKEN", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Login Berhasil",
      data: {
        access_token: accessToken,
      },
    });
  } else {
    res.status(401);
    throw new Error("Email atau password salah!");
  }
});

export const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.REFRESH_TOKEN) return res.sendStatus(204);

  const refreshToken = cookies.REFRESH_TOKEN;

  const userRefreshToken = await prisma.auth.findFirst({
    where: {
      token: refreshToken,
    },
  });

  if (!userRefreshToken) {
    res.clearCookie("REFRESH_TOKEN", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.sendStatus(204);
  }

  await prisma.auth.deleteMany({
    where: {
      id_user: userRefreshToken.userId,
    },
  });

  res.clearCookie("REFRESH_TOKEN", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.sendStatus(204);
});

export const accessTokenRefresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.REFRESH_TOKEN) return res.sendStatus(401);

  const refreshToken = cookies.REFRESH_TOKEN;

  const userRefreshToken = await prisma.auth.findFirst({
    where: {
      token: refreshToken,
    },
  });
  if (!userRefreshToken) return res.sendStatus(404);

  const decoded = verifyRefreshToken(refreshToken);

  const payload = {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
  };

  const accessToken = generateAccessToken(payload);

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Access Token berhasil diperbarui",
    data: {
      access_token: accessToken,
    },
  });
});
