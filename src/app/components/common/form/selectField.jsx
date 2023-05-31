import React from "react";
import PropTypes from "prop-types";

// передаем в форму пропсы
const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    name,
    error
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };

    // создадим функцию для создания динамического класса. Делаем для подсвечивания ошибки в форме
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    // по сути options это профессии
    // если options не массив и он является объектом то мы его трансформируем в массив
    // сделаем метод для рендеринга массива
    // const optionsArray =
    //     !Array.isArray(options) && typeof options === "object"
    //         ? Object.values(options)
    //         : options;
    // console.log(optionsArray);
    let optionsArray = [];

    if (Array.isArray(options)) {
        optionsArray = options;
    } else if (typeof options === "object" && options !== null) {
        optionsArray = Object.values(options);
    }

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray.length > 0 &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

// при помощи библиотеки prop-types проверяем пропсы в компоненте
SelectField.propTypes = {
    defaultOption: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField;
