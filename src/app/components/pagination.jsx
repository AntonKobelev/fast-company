import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

// создаем компонент Пагинация - разбивка на страницы и сразу делаем деструктуризацию объекта пропс, а именно длину отфильтрованного списка юзеров, размер страницы, функцию handlePageChange, текущую страницу
const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
    // создаем переменную pageCount - количество страниц, берем длинуотфильтрованного списка юзеров делим на размер страницы и округляем в большую сторону
    const pageCount = Math.ceil(itemsCount / pageSize);
    // если количество страниц равно 1 то возвращаем null
    if (pageCount === 1) return null;
    // создаем переменную страницы используя библиотеку lodash. Возвращается новый массив от 1 до ... [1, .,... ]. Этот массив нужен для отображения кнопок для каждой страницы
    const pages = _.range(1, pageCount + 1);
    // возвращаем JSX-разметку
    return (
        // используем навигационную панель nav
        <nav>
            {/* создаем тег несортированный список */}
            <ul className="pagination">
                {/* при помощи метода map проходим по массиву pages, данный метод возвращает новый массив li */}
                {pages.map((page) => {
                    return (
                        // создаем тег li - это элемент несортированного списка
                        <li
                            // тут используем тернарный оператор, проверяем равна ли page текущей странице, если да то к классу "page-item" добавляется строка "active" то есть li подсветится, если нет то li никак не меняется
                            className={
                                "page-item " +
                                (page === currentPage ? "active" : "")
                            }
                            // также для каждого элемента должен быть назначен key для того, чтобы react смог идентифицировать каждый элемент li
                            key={"page_" + page}
                        >
                            {/* cоздаем кнопку */}
                            <button
                                className="page-link"
                                // атрибуту onClick назначаем стрелочную функцию, которая будет вызывать функцию onPageChange - смена страницы, и передаем туда ту страницу, которой принадлежит данная кнопка
                                onClick={() => onPageChange(page)}
                            >
                                {/* тут выводим номер страницы */}
                                {page}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

// используя библиотеку prop-types мы проверяем тип передаваемых пропсов в компонент
Pagination.propTypes = {
    // длина отфильтрованного списка юзеров должна быть типом данных number
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

// экспортируем компонент Pagination
export default Pagination;
