import React from "react";
import PropTypes from "prop-types";

// создаем компонент SearchStatus - Статус поиска, сразу делаем деструктуризацию для получения пропсов, переданных в компонент, в данном случае получаем свойство length
const SearchStatus = ({ length }) => {
    // создаем стрелочную функцию renderPhrase - отрисовка фразы и передаем туда аргумент - длина фразы, т.е. будем склонять фразу
    const renderPhrase = (number) => {
        // создаем переменную lastOne - последний символ. Преобразуем число в строку, например 12, и метод slice вернет число 2 и затем идет преобразование 2 в число.
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) {
            return "человек тусанет";
        }
        // если послдений символ равен 1 то возвращаем строку человек тусанет
        if (lastOne === 1) return "человек тусанет";
        // проверяем если последний символ есть массиве то выводится индекс числа в массиве и если он больше либо равен нулю то возвращаем фразу человек тусанет
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        return "человек тусанет";
    };
    // возвращаем JSX-разметку
    return (
        // создаем тег h2
        <h2>
            {/* создаем тег span, если длина фразы больше нуля то присваиваиваем первичный bg иначе bg-danger */}
            <span
                className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}
            >
                {/* тут уже внутри span выводим фразу, если длина фразы больше нуля
                то выводим число и вызываем стрелочную функцию renderPhrase иначе никто... */}
                {length > 0
                    ? `${length + " " + renderPhrase(length)}   с тобой сегодня`
                    : "Никто с тобой не тусанет"}
            </span>
        </h2>
    );
};

// применяем библиотеку prop-types для проверки пропсов, передаваемых в компонент SearchStatus
SearchStatus.propTypes = {
    // свойство length может быть number
    length: PropTypes.number.isRequired
};

// экспортируем компонент SearchStatus
export default SearchStatus;
