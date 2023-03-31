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
                message: "Электронная почта не должна быть пустой"
            }
        },
        password: {
            isRequired: {
                message: "Пароль не должен быть пустым"
            }
        }
    };

    // создаем функцию подтверждение-validate
    const validate = () => {
        const errors = validator(data, validatorConfig);
        console.log("errors", errors["email"]);
        setErrors(errors);
        // true если нет ошибок
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        console.log(data);
    };
    return (
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
            <button>Submit</button>
        </form>
    );
};

export default Login;
