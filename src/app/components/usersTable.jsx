import React from "react";
// import User from "./user";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import BookMark from "./bookmark";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества" },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    // передаем через свойство status состояние закладки true или false
                    status={user.bookmark}
                    // передаем через свойство onClick колбэк-функцию, в этой функции происходит вызов другой функции - Переключение закладки, при этом она принимает в себя идентификатор
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    // присваиваем атрибуту onClick функцию обратного вызова, которая вызвает функцию onDelete и передаем туда параметр _id
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };
    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ data: users, columns }} />
            {/* <tbody>
                {users.map((user) => (
                    // помещаем компонент User и передаем туда пропсы. Передаем пропс key для того, чтобы react отслеживал каждый компонент User. Передаем спред-операторы {...rest} - мы расширяем объект rest и передаем его свойства в компонент User например функции обратного вызова и {...user} - мы расширяем объект user и передаем его свойства в компонент User например имя, фамилию и.т.д.
                    <User key={user._id} {...rest} {...user} />
                ))}
            </tbody> */}
        </table>
    );
};

UserTable.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserTable;
