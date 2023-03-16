import React from "react";
import PropTypes from "prop-types";

// передаем данные (делаем универсально, так как могут быть и юзеры и другая информация) - т.е. data - это массив, а columns - это объект
const TableBody = ({ data, columns }) => {
    console.log("data", data);
    console.log("columns", columns);
    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>
                            {item[columns[column].path]}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
