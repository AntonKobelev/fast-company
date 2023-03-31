// создаем функцию валидатор, которая будет принимать данные-data и сравнивать их с файлом-конфигурации-config
export function validator(data, config) {
    // создадим вспомогательную функцию-validate, которая будет принимать в себя метод-method, данные-data, файл-конфигурации-config
    // function validate(method, data, config) {
    //     // создаем переменную для хранения ошибок
    //     const errors = {};
    //     switch (config) {
    //         case "isRequired":
    //             if (data[fieldName].trim() === "") {
    //                 errors[
    //                     fieldName
    //                 ] = `${fieldName} обязательно для заполнения!`;
    //             }
    //     }
    // }
    // создаем переменную для хранения ошибок
    const errors = {};
    // пробегаемся по объекту data и извлекаем оттуда значения полей
    for (const fieldName in data) {
        // получив название поля мы можем его использовать при извлечении метода из файла-конфигурации (к примеру метод isRequired - обязательный, поле заполняемое пользователем не должно быть пустым)
        for (const method in config[fieldName]) {
            switch (method) {
                case "isRequired":
                    if (data[fieldName].trim() === "") {
                        errors[fieldName] = config[fieldName][method];
                        console.log(errors);
                    }
                    break;
            }
        }
    }
    return errors;
}
