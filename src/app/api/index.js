// создаем файлик index.js куда импортируем две переменные users и professions из двух файлов

import users from "./fake.api/user.api";
import professions from "./fake.api/professions.api";

// создаем объект API и добавляем туда users и professions
const API = {
    users,
    professions
};

// экспортируем объект API
export default API;
