import bcrypt from "bcrypt";

import prisma from "../utils/prisma.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

export const register = async (req, res, next) => {
  const { nama, email, password } = req.body;

  try {
    const emailAvailability = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // validasi
    if (!nama) {
      res.status(400);
      throw new Error("Nama tidak boleh kosong!");
    }

    if (!email) {
      res.status(400);
      throw new Error("Email tidak boleh kosong!");
    }

    if (!password) {
      res.status(400);
      throw new Error("Password tidak boleh kosong!");
    }

    if (emailAvailability) {
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
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      res.status(400);
      throw new Error("Email tidak boleh kosong!");
    }

    if (!password) {
      res.status(400);
      throw new Error("Password tidak boleh kosong");
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        id: user.id,
        nama_lengkap: user.nama_lengkap,
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

      res.cookie("IS_LOGGED_IN", true, {
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      res.status(200).json({
        code: 200,
        status: "OK",
        data: {
          access_token: accessToken,
        },
      });
    } else {
      res.status(401);
      throw new Error("Email atau password salah!");
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  const cookies = req.cookies;

  try {
    if (!cookies?.REFRESH_TOKEN) {
      return res.sendStatus(204);
    }

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

      res.clearCookie("IS_LOGGED_IN", {
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

    res.clearCookie("IS_LOGGED_IN", {
      secure: true,
      sameSite: "none",
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const accessTokenRefresh = async (req, res, next) => {
  const cookies = req.cookies;

  try {
    if (!cookies?.REFRESH_TOKEN) {
      return res.sendStatus(401);
    }

    const refreshToken = cookies.REFRESH_TOKEN;

    const userRefreshToken = await prisma.auth.findFirst({
      where: {
        token: refreshToken,
      },
    });

    if (!userRefreshToken) {
      return res.sendStatus(404);
    }

    const decoded = verifyRefreshToken(refreshToken);

    const payload = {
      id: decoded.id,
      nama_lengkap: decoded.nama_lengkap,
      email: decoded.email,
      role: decoded.role,
    };

    const accessToken = generateAccessToken(payload);

    res.status(200).json({
      code: 200,
      status: "OK",
      data: {
        access_token: accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
