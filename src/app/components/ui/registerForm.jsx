import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });

    // создаем стейт для хранения качеств
    const [qualities, setQualities] = useState([]);
    // создаем стейт для хранения ошибок, которые вводит пользователь
    const [errors, setErrors] = useState({});
    // создаем хук юзстейт для хранения профессий, там сейчас ничего нет
    const [professions, setProfession] = useState();

    // тут мы используем хук useEffect, данный хук вызывает функцию обратного вызова, каждый раз, когда компонент отрисовывается. Хук useEffect используется для получения списка профессий с помощью API и установки полученных данных в переменную professions. Т.е. useEffect будет вызван один раз, так как пустой массив [] не содержит зависимостей.
    useEffect(() => {
        // после вызова функции fetchAll() у объекта api.professions данные будут получены асинхронно в виде data и они устанавливаютя в переменную профессии. После того, как данные будут установлены в состояние, компонент будет перерисован и пользователь увидит обновленный список профессий.
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });

        // добавим еще один запрос
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
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
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите Вашу профессию"
            }
        },
        license: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
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
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
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
            <SelectField
                defaultOption="Выберите"
                options={professions}
                name="profession"
                onChange={handleChange}
                value={data.profession}
                label="Выберите вашу профессию"
                error={errors.profession}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" }
                ]}
                label="Выберите Ваш пол"
                value={data.sex}
                name="sex"
                onChange={handleChange}
            />
            <MultiSelectField
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Выберите Ваши качества"
            />

            <CheckBoxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.license}
            >
                Подтвердить <a>лицензионное соглашение</a>
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

export default RegisterForm;
