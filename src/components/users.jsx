import React from "react";
import Pagination from "./pagination";
import User from "./user";


const Users = ({users, ...rest}) => {
  // return html
  return (
    <>
      <table className="table">
        {/*create head table*/}
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {/* run for array of users with map method */}
          {users.map((user) => (
              <User key= {user._id}{...user} {...rest}/>
              ))}
        </tbody>
      </table>
      <Pagination itemsCount />

    </>
  );
};

export default Users;
