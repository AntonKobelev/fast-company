import React from "react";
import PropTypes from "prop-types";

// создаем компонент Закладка, делаем деструктуризацию объекта при передаче свойств в компонент - status и ...rest - это сбор всех оставшихся аргументов в массив, в данном случае это функция onClick
const BookMark = ({ status, ...rest }) => {
    // возвращаем JSX-разметку
    return (
        // создаем тег button c аргументом onClick
        <button {...rest}>
            {/* создаем иконку закладки, если статус true то добавляем к классу сердце иначе ничего */}
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
        </button>
    );
};

// используем библиотеку prop-types для проверки аргументов передаваемых в компонент BookMark,
BookMark.propTypes = {
    // тип свойства status может быть только boolean
    status: PropTypes.bool.isRequired
};

// экспортируем компонент Закладку
export default BookMark;
