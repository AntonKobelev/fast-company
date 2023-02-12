import React from "react";
import Quality from "./qualitie";
import Bookmark from "./bookmark";

const User = ({
    name, 
    qualities, 
    profession, 
    completedMeetings,
    onToggle,
    rate,
    bookmark,
    _id, 
    onDelete,
    onToggleBookmark
}) => {
    return (
        // create row table
        <tr key={_id}>
        <td>{name}</td>
        <td>
          {/* run for array of qualities with map method */}
          {qualities.map((quality) => 
            <Quality {...quality}key={quality._id}/>
            )}
        </td>
        <td>{profession.name}</td>
        <td>{completedMeetings}</td>
        <td>{rate}</td>
        <td>
            <Bookmark status={bookmark} onToggle={onToggleBookmark} id = {_id}/>
        </td>
        <td>
          {/* create button with method onClick that calls function handleDelete with argument user._id */}
          <button
            key={_id}
            type="button"
            className="btn btn-danger"
            onClick={() => {
              onDelete(_id);
            }}
          >
            delete
          </button>
        </td>
      </tr>
    )
}

export default User