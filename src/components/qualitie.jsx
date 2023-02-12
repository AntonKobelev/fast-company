import React from "react";

const Quality =({_id, name, color}) => {
    return (
        <span className={`badge bg-${color} mx-1`}>{name}</span>
    )
}

export default Quality