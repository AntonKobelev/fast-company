import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

// делаем деструктуризацию объекта для передачи свойств в компонент
const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    bookmark,
    onToggleBookMark
}) => {
    // возращается JSX-разметка
    return (
        // создаем строку
        <tr>
            {/* создаем ячейку имя */}
            <td>{name}</td>
            {/* создаем ячейку качества */}
            <td>
                {/* проходим по массиву qualities, метод map возыращает новый
                массив, каждый элемент которого мы заменим на компонент Qualitie, куда передаем ключ чтобы React смог отслеживать каждый компонент и с помощью. Передаем спред оператор для расширения объекта qual и передаем его свойства в компонент Qualitie */}
                {qualities.map((qual) => (
                    <Qualitie key={qual._id} {...qual} />
                ))}
            </td>
            {/* создаем ячейку профессии */}
            <td>{profession.name}</td>
            {/* создаем ячейку количества завершенных встреч  */}
            <td>{completedMeetings}</td>
            {/* создаем ячейку рейтинга  */}
            <td>{rate} /5</td>
            {/* создаем ячейку закладки  */}
            <td>
                {/* помещаем сюда компонент BookMark */}
                <BookMark
                    // передаем через свойство status состояние закладки true или false
                    status={bookmark}
                    // передаем через свойство onClick колбэк-функцию, в этой функции происходит вызов другой функции - Переключение закладки, при этом она принимает в себя идентификатор
                    onClick={() => onToggleBookMark(_id)}
                />
            </td>
            {/* создаем ячейку для кнопки  */}
            <td>
                {/* создаем кнопку закладки  */}
                <button
                    // присваиваем атрибуту onClick функцию обратного вызова, которая вызвает функцию onDelete и передаем туда параметр _id
                    onClick={() => onDelete(_id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

// при помощи библиотеки prop-types проверяем пропсы в компоненте
User.propTypes = {
    // _id может быть только строкой
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default User;
