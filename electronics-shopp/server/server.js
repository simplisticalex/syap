const http = require('http');
const url = require('url');
const fs = require('fs');

const PORT = 3001;
const DB_PATH = './server/db.json';

// Загрузка данных из файла
const loadData = () => {
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
};

// Отправка JSON ответа
const sendJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

// Отправка ошибки
const sendError = (res, statusCode, message) => {
  sendJSON(res, statusCode, { error: message });
};

// Обработка маршрутов
const handleRequest = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  const method = req.method;

  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (method === 'GET') {
    if (pathName === '/categories') {
      try {
        const { categories } = loadData();
        sendJSON(res, 200, categories);
      } catch (error) {
        sendError(res, 500, 'Failed to load categories');
      }
    } else if (pathName.startsWith('/categories/')) {
      try {
        const categoryId = parseInt(pathName.split('/')[2]);
        const { categories } = loadData();
        const category = categories.find(cat => cat.id === categoryId);
        
        if (!category) {
          sendError(res, 404, 'Category not found');
        } else {
          sendJSON(res, 200, category);
        }
      } catch (error) {
        sendError(res, 500, 'Failed to load category');
      }
    } else if (pathName === '/products') {
      try {
        const { products } = loadData();
        let filteredProducts = products;

        // Фильтрация по categoryId если параметр передан
        if (parsedUrl.query.categoryId) {
          filteredProducts = products.filter(
            product => product.categoryId === parseInt(parsedUrl.query.categoryId)
          );
        }

        sendJSON(res, 200, filteredProducts);
      } catch (error) {
        sendError(res, 500, 'Failed to load products');
      }
    } else {
      sendError(res, 404, 'Route not found');
    }
  } else {
    sendError(res, 405, 'Method not allowed');
  }
};

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});