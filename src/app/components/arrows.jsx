import React from "react";
import PropTypes from "prop-types";

const Arrows = ({ order }) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-caret-${
                    order === "asc" ? "down" : "up"
                }-fill`}
                viewBox="0 0 16 16"
            >
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
        </>
    );
};

// используем библиотеку prop-types для проверки аргументов передаваемых в компонент BookMark,
Arrows.propTypes = {
    // тип свойства status может быть только boolean
    order: PropTypes.string.isRequired
};

export default Arrows;
