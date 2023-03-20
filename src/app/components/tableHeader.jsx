import React from "react";
import PropTypes from "prop-types";
import Arrows from "./arrows";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    // создаем функцию сортировки элементов в столбце и передаем туда аргумент по которому будем сортировать
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort(() => ({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            }));
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    // создаем функцию для создания стрелок, передаем туда column
    const renderContent = (column) => {
        // если path(путь = name) отсортированного массива равен path(пути) элемента объекта columns
        if (selectedSort.path === columns[column].path) {
            // возвращаем компонент Arrows и передаем туда пропс, т.е. порядок
            return <Arrows order={selectedSort.order} />;
        } else {
            // иначе ничего
            return null;
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={() => {
                            if (columns[column].path) {
                                handleSort(columns[column].path);
                            } else {
                                return undefined;
                            }
                        }}
                        scope="col"
                        role={columns[column].path && "button"}
                    >
                        {columns[column].name}
                        {renderContent(column)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
