const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
  }
);

/**
 * Verifies the DB connection. Logs success or re-throws on failure.
 * @returns {Promise<void>}
 */
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection established');
  } catch (err) {
    console.error('❌ Unable to connect to MySQL:', err);
    throw err;
  }
}

module.exports = { sequelize, connectDB };
