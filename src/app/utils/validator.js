// создаем функцию валидатор, которая будет принимать данные-data и сравнивать их с файлом-конфигурации-config
export function validator(data, config) {
    // создаем переменную для хранения ошибок
    const errors = {};

    // создаем вспомогательную функцию validate(), которая будет принимать в себя три параметра validateMethod - метод к примеру - isRequired, data - данные, которые вводит пользователь в поля email, password и передаем по сути объект к примеру isRequired - message
    function validate(validateMethod, data, config) {
        // создаем переменную для хранения статуса проверки
        let statusValidate;
        switch (validateMethod) {
            case "isRequired": {
                if (typeof data === "boolean") {
                    statusValidate = !data;
                } else {
                    statusValidate = data.trim() === "";
                }
                break;
            }
            // проверяем на правило isEmail
            case "isEmail": {
                // создаем константу и добавляем туда регулярное выражение
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                // если data соответствует регулярному выражению то возвращается true. Перевернем, если будет false, т.е. если не будет соответствовать то вернется true и вернем config message
                statusValidate = !emailRegExp.test(data);
                break;
            }
            // проверяем на наличие большой буквы
            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "isContainDigit": {
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }
            case "min": {
                statusValidate = data.length < config.value;
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    }

    // пробегаемся по объекту data и извлекаем оттуда значения полей
    for (const fieldName in data) {
        // console.log("fieldName", fieldName);
        // получив название поля мы можем его использовать при извлечении метода из файла-конфигурации (к примеру метод isRequired - обязательный, поле заполняемое пользователем не должно быть пустым)
        for (const validateMethod in config[fieldName]) {
            // создаем переменную error, где будем хранить одну ошибку, переменной будет присваиваться результат выполнения вспомогательной функции validate, туда передаем метод, данные пользователя, получаемые через fieldName и конфиг т.е. по сути объект к примеру isRequired - message, потом его вызовем.
            // console.log("validateMethod", validateMethod);
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            // если ошибка есть и ошибки нет в объекте errors то запишем её в объект errors
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
