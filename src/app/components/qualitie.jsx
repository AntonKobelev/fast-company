import React from "react";
import PropTypes from "prop-types";

// создаем компонент Качества и делаем деструктуризацию объекта для передачи свойств в компонент
const Qualitie = ({ color, name }) => {
    // возвращаем JSX-разметку
    return (
        // создаем тег span, к классу добавляем color
        <span className={"badge m-1 bg-" + color}>
            {/* помещаем сюда имя качества */}
            {name}
        </span>
    );
};

// при помощи библиотеки prop-types определяем тип свойств передаваемых в компонент
Qualitie.propTypes = {
    // то есть цвет может быть типом строка
    color: PropTypes.string.isRequired,
    // имя может быть типом строка
    name: PropTypes.string.isRequired
};

// экспортируем компонент Qualitie
export default Qualitie;
