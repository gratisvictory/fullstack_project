const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Запоните все обязательные поля",
      });
    }
  
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
  
    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
  
    const secret = process.env.JWT_SECRET;
  
    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "7d" }),
      });
    } else {
      return res.status(400).json({
        message: "Неверно введён логин или пароль",
      });
    }
  
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так",
    })
  }
}

  

const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({
        message: "Заполните обязательные поля",
      });
    }
    const userCreated = await prisma.user.findFirst({
      where: {
        email,
      },
    });
  
    if (userCreated) {
      return res.status(400).json({
        message: "Пользователь с таким email уже существует",
      });
    }
  
    const saltRounds = 10;
  
    const salt = await bcrypt.genSalt(saltRounds);
  
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  
    const secret = process.env.JWT_SECRET;
  
    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "7d" }),
      });
    } else {
      return res.status(400).json({
        message: "Не удалось создать пользователя",
      });
    }
  }
   catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так",
    })
  }
}
  

const current = async (req, res) => {
  return res.status(200).json(req.user)
};

module.exports = {
  login,
  register,
  current,
};
