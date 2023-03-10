import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const UserTable = ({ users, ...rest }) => {
    return (
        <table className="table">
            {/* создаем заголовок таблицы */}
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    // помещаем компонент User и передаем туда пропсы. Передаем пропс key для того, чтобы react отслеживал каждый компонент User. Передаем спред-операторы {...rest} - мы расширяем объект rest и передаем его свойства в компонент User например функции обратного вызова и {...user} - мы расширяем объект user и передаем его свойства в компонент User например имя, фамилию и.т.д.
                    <User key={user._id} {...rest} {...user} />
                ))}
            </tbody>
        </table>
    );
};

UserTable.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default UserTable;
