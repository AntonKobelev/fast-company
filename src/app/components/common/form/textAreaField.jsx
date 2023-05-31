import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange, error }) => {
    // добавим новый метод - мы типизируем все поля чтобы можно было добавлять все поля из любого места
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };

    // создадим функцию для создания динамического класса. Делаем для подсвечивания ошибки в форме
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            {/* данная конструкция нужна для скругления полей при налиии ошибок и выпрямлении полей при их остутствии */}
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};
// назначаем значение для text по-умолчанию
TextAreaField.defaultProps = { type: "text" };

// используем библиотеку prop-types для проверки аргументов передаваемых в компонент TextField,
TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAreaField;
