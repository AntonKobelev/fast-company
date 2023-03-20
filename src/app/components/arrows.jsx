import React from "react";
import PropTypes from "prop-types";

const Arrows = ({ order }) => {
    return (
        <i className={`bi bi-caret-${
            order === "asc" ? "down" : "up"
        }-fill`}></i>
    );
};

// используем библиотеку prop-types для проверки аргументов передаваемых в компонент BookMark,
Arrows.propTypes = {
    // тип свойства status может быть только boolean
    order: PropTypes.string.isRequired
};

export default Arrows;
