const { CORS_CONFIG } = require('../config');

const corsVerification = (req, res, next) => {
  const { origin } = req.headers;
  // если URL клиента содержится в ALLOWED_ORIGINS,
  // то разрешаем заголовки и Credentials(для cookie)
  if (CORS_CONFIG.ALLOWED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  const { method } = req;
  // если запрос предварительный(option), то разрешаем стандартные методы
  // и заголовки клиентского запроса
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', CORS_CONFIG.ALLOWED_METHODS);
    const requestHeaders = req.headers['access-control-request-headers'];
    res.header('Access-Control-Allow-Headers', requestHeaders).end();
    // отправляем ответ на предварительный запрос
    return;
  }
  // если это не option запрос, продолжаем его обрабатывать
  next();
};

module.exports = corsVerification;
