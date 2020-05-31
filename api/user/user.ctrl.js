// DB
import models from "../../models";

// Data Controller
const getUsers = async (req, res) => {
  const limit = parseInt(req.query.limit || 10, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  try {
    const users = await models.User.findAll({ limit });
    res.json(users);
  } catch (e) {
    res.status(500).end();
  }
};

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  try {
    const user = await models.User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).end();
    }
    res.json(user);
  } catch (e) {
    res.status(500).end();
  }
};

const deleteUserById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  try {
    const result = await models.User.destroy({
      where: { id },
    });
    if (result) {
      return res.status(204).end();
    } else {
      return res.status(404).end();
    }
  } catch (e) {
    res.status(500).end();
  }
};

const createUser = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).end();
  }

  try {
    const user = await models.User.create({ name });
    res.status(201).json(user);
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      return res.status(409).end();
    }
    res.status(500).end();
  }
};

const editUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const name = req.body.name;
  if (!name) {
    return res.status(400).end();
  }

  try {
    const user = await models.User.findOne({
      where: { id },
    });
    if (!user) {
      return res.status(404).end();
    } else {
      user.name = name;
      try {
        const result = await user.save();
        if (result) {
          return res.json(user);
        }
      } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {
          return res.status(409).end();
        }
        res.status(500).end();
      }
    }
  } catch (e) {
    res.status(500).end();
  }

  //   const isDuplicated = users.filter((user) => user.name === name)[0];
  //   if (isDuplicated) {
  //     return res.status(409).end();
  //   }

  //   const user = users.filter((user) => user.id === id)[0];
  //   if (!user) {
  //     return res.status(404).end();
  //   }

  //   user.name = name;

  //   res.json(user);
};

export default {
  getUsers,
  getUserById,
  deleteUserById,
  createUser,
  editUser,
};
