import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
// import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    // создаем стейт для хранения ошибок, которые вводит пользователь
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    // создаем useEffect для отслеживания ввода пользователем текста
    useEffect(() => {
        validate();
    }, [data]);

    // создадим схему валидации для yup
    // const validateScheme = yup.object().shape({
    //     password: yup
    //         .string()
    //         .required("Пароль обязателен для заполнения")
    //         .matches(
    //             /(?=.*[A-Z])/,
    //             "Пароль должен содержать хотя бы одну заглавную букву"
    //         )
    //         .matches(
    //             /(?=.*[0-9])/,
    //             "Пароль должен содержать хотя бы одно число"
    //         )
    //         .matches(
    //             /(?=.*[!@#$%^&*])/,
    //             "Пароль должен содержать хотя бы один из символов !@#$%^&*"
    //         )
    //         .matches(
    //             /(?=.{8,})/,
    //             "Пароль должен состоять минимум из 8 символов"
    //         ),
    //     email: yup
    //         .string()
    //         .required("Электронная почта обязательна для заполнения")
    //         .email("Электронная почта введена не корректно!")
    // });

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
        // валидация для yup
        // validateScheme
        //     .validate(data)
        //     .then(() => setErrors({}))
        //     .catch((err) => setErrors({ [err.path]: err.message }));
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
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                disabled={!isValidate}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
