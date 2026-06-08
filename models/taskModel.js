const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Task = sequelize.define(
  'Task',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'tasks',
    timestamps: true,
    updatedAt: false,
  }
);

/**
 * Returns all tasks ordered by createdAt ascending.
 * @returns {Promise<Task[]>}
 */
async function findAll() {
  return Task.findAll({ order: [['createdAt', 'ASC']] });
}

/**
 * Returns the task with the given id, or null if not found.
 * @param {number} id
 * @returns {Promise<Task|null>}
 */
async function findById(id) {
  return Task.findByPk(id);
}

/**
 * Creates a new task and returns it.
 * @param {{ title: string, completed?: boolean }} param0
 * @returns {Promise<Task>}
 */
async function insert({ title, completed }) {
  return Task.create({ title, completed });
}

/**
 * Applies partial fields to an existing task and returns it, or null if not found.
 * @param {number} id
 * @param {{ title?: string, completed?: boolean }} partial
 * @returns {Promise<Task|null>}
 */
async function update(id, partial) {
  const task = await Task.findByPk(id);
  if (!task) return null;
  return task.update(partial);
}

/**
 * Removes the task with the given id. Returns true if removed, false if not found.
 * @param {number} id
 * @returns {Promise<boolean>}
 */
async function remove(id) {
  const count = await Task.destroy({ where: { id } });
  return count > 0;
}

module.exports = { Task, findAll, findById, insert, update, remove };
