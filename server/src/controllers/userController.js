import prisma from "../utils/prisma.js";

export const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        nama_lengkap: true,
        email: true,
        role: true,
        url_profil_user: true,
      },
    });

    if (user.length === 0) {
      res.status(404);
      throw new Error("User tidak ditemukan");
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const listUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (user.length === 0) {
      res.sendStatus(204);
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    if (!email) {
      res.status(400);
      throw new Error("Email tidak boleh kosong");
    }

    if (!password) {
      res.status(400);
      throw new Error("Kata sandi tidak boleh kosong");
    }

    if (!role) {
      res.status(400);
      throw new Error("Role tidak boleh kosong");
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
      status: "Created",
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        email: email,
        password: password,
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
