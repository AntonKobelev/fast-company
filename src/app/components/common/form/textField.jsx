import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    // создадим состояние для кнопки, которая будет показывать/скрывать пароль
    const [showPassword, setShowPassword] = useState(false);

    // добавим новый метод - мы типизируем все поля чтобы можно было добавлять все поля из любого места
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };

    // создадим тогл функцию - переключатель false/true
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    // создадим функцию для создания динамического класса. Делаем для подсвечивания ошибки в форме
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div>
            <label htmlFor="email">{label}</label>
            {/* данная конструкция нужна для скругления полей при налиии ошибок и выпрямлении полей при их остутствии */}
            <div className={"input-group" + (error ? " has-validation" : "")}>
                <input
                    // если showPassword равен true тип данных будет text и пароль мы увидим иначе тип данных password
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                />
                {/* чтобы обоим полям не назначать кнопку, мы сначала проверим type */}
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i
                            className={
                                "bi bi-eye" + (showPassword ? "-slash" : "")
                            }
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};
// назначаем значение для text по-умолчанию
TextField.defaultProps = { text: "text" };

// используем библиотеку prop-types для проверки аргументов передаваемых в компонент TextField,
TextField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default TextField;
