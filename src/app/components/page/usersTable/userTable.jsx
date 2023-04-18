import React from "react";
import PropTypes from "prop-types";
import BookMark from "../../common/bookmark";
import QualitiesList from "../../ui/qualities/qualitiesList";
import Table from "../../common/table/table";

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
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        profession: {
            path: "profession.name",
            name: "Профессия"
        },
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
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
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
