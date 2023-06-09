const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
  try {
    const employee = await prisma.employee.findMany();
    res.status(200).json(employee);
  } catch (e) {
    res.status(400).json({ message: "Не удалось получить сотрудников" });
  }
};

const add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({
        message: "Все поля обязательные",
      });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    return res.status(201).json(employee);
  } catch (e) {
    res.status(500).json({ message: "Не удалось создать сотрудника" });
  }
};

const remove = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.employee.delete({
      where: {
        id,
      },
    });
    res.status(204).json("OK");
  } catch (e) {
    return res.status(500).json({
      message: "Не удалось удалить сотрудника",
    });
  }
};

const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;
  try {
    await prisma.employee.update({
      where: {
        id: id,
      },
      data: data,
    });
    res.status(204).json("OK");
  } catch (e) {
    res.status(500).json({
      message: "Не удалось редактировать сотрудника",
    });
  }
};

const employeeID = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(employee);
  } catch (e) {
    res.status(500).json({
      message: "Не получить сотрудника",
    });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  employeeID,
};
