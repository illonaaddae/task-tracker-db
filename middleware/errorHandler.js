/**
 * Global error handler. Maps Sequelize errors and ApiError to clean HTTP responses.
 * @param {Error & { statusCode?: number }} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function errorHandler(err, req, res, next) {
  let status;
  let message;

  if (err.name === 'SequelizeValidationError') {
    status = 400;
    message = err.errors.map((e) => e.message).join('; ');
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 409;
    message = err.errors.map((e) => e.message).join('; ');
  } else if (err.name === 'SequelizeDatabaseError') {
    status = 400;
    message = 'Invalid data sent to the database';
  } else if (err.name && err.name.startsWith('SequelizeConnection')) {
    status = 503;
    message = 'Database unavailable';
  } else if (typeof err.statusCode === 'number') {
    status = err.statusCode;
    message = err.message;
  } else {
    status = 500;
    message = 'Internal Server Error';
    console.error(err.stack);
  }

  console.error(`[ERROR] ${status} ${message}`);

  res.status(status).json({
    error: {
      message,
      status,
    },
  });
}

module.exports = errorHandler;
