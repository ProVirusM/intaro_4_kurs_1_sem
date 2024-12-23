const express = require("express");
const mongoose = require("mongoose");
const resumeRoutes = require("./routes/resumeRoutes");  // Подключаем маршрут
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors());
// Подключаемся к базе данных MongoDB
mongoose.connect("mongodb://localhost:27017/resumeDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Подключение к базе данных успешно"))
    .catch((err) => console.log("Ошибка подключения к базе данных: ", err));

// Middleware для парсинга JSON данных
app.use(express.json());

// Подключаем маршруты
app.use("/api", resumeRoutes);  // Все маршруты из resumeRoutes будут начинаться с /api

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
