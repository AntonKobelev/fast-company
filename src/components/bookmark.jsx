import React from "react"

const Bookmark = ({onToggle, status, id}) => {
    return (
        <button onClick={() => onToggle(id)}>
            <i className={"bi bi-bookmark" + (status ? "-check-fill": "")}></i>
        </button>
    )
        
}
export default Bookmark