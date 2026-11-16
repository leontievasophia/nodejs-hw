export const errorHandler = (err, req, res, next) => {
  console.error('Error Middleware:', err);

  // Якщо помилка має HTTP-статус
  const status = err.status || err.statusCode || 500;

  if (status >= 400 && status < 500) {
    return res.status(status).json({
      message: err.message,
    });
  }

  const isProd = process.env.NODE_ENV === 'production';

  // Внутрішні помилки сервера
  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message || 'Internal Server Error',
  });
};
