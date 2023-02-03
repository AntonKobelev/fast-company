import React, {useState} from "react";
import api from '../api'

const Users = () => {
    // create hook
    const [users, setUsers] = useState(api.users.fetchAll())

    // create function for delete users
    const handleDelete = (userId) => {
    }

    // create function for render user and 
    const renderUser = (arrayUsers) => {
        arrayUsers.map((item) => {
            {<tr>
                <td>{item.name}</td>
                <td>Some</td>
                <td>@mdo</td>
            </tr>}
        })

    }



    // create function for rendering users
    const renderPhrase = (number) => {
        return (
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Test</td>
                        <td>Some</td>
                        <td>@mdo</td>
                    </tr>
                    {renderUser(users)}
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>)
    }
    // return html 
    return (
        <>
            {/* call function renderPhrase */}
            {renderPhrase()}


        </>)
}

export default Users