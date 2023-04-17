import React, { useEffect, useState } from "react";
import TextField from "../textField";
import { validator } from "../../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    // создаем стейт для хранения ошибок, которые вводит пользователь
    const [errors, setErrors] = useState({});

    const handleChange = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    // создаем useEffect для отслеживания ввода пользователем текста
    useEffect(() => {
        validate();
    }, [data]);

    // создаем объект конфигурации, согласно которого будем проверять корректность введенных данных
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почта введена не корректно!"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };

    // создаем функцию подтверждение-validate
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        // true если нет ошибок
        return Object.keys(errors).length === 0;
    };

    // создаем переменную isValidate для правильного отображения кнопки submit, если ошибок нет, то она отображается
    const isValidate = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        console.log(data);
    };
    return (
        <div className="container mt-5 shadow p-4">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Электронная почта"
                            type="text"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            disabled={!isValidate}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
