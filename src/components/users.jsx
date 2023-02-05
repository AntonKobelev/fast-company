import React, {useState} from "react";
import api from '../api'

const Users = () => {
    // create hook
    const [users, setUsers] = useState(api.users.fetchAll())

    // create function for delete users
    const handleDelete = (userId) => {
        // set currence state users 
        setUsers(prevState => prevState.filter((item) => {
            return item._id != userId
        }) )
    }
    // create array textForms for function renderPhrase
    const textForms = ['человек тусанет с тобой сегодня', 'человека тусанет с тобой сегодня']

    // create function for rendering phrase
    const renderPhrase = (number) => {
        const arrayUsersLength = Math.abs(number) % 100
        if (number === 0) {
            return 'Никто c тобой не тусанет'
        } else if (arrayUsersLength >= 5 && arrayUsersLength < 20 || arrayUsersLength === 1) { return `${number} ${textForms[0]}`
        } else if (arrayUsersLength > 1 && arrayUsersLength < 5) { return `${number} ${textForms[1]}`}
    }

    // return html 
    return (
        <>  
            {/*create title number of people for party. Generate valid phrase with function renderPhrase*/}
            <span className="badge bg-primary fs-5">{`${renderPhrase(users.length)}`} </span>
            <table className="table">
                {/*create head table*/}           
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
                    {/* run for array of users with map method */}
                    {users.map((user) => {
                        return (
                            // create row table
                            <tr key = {user._id}>
                                <td>{user.name}</td>
                                <td>
                                    {/* run for array of qualities with map method */}
                                    {user.qualities.map((quality) => {
                                        return <span className = {`badge bg-${quality.color} mx-1`} key = {quality._id} >{quality.name}</span>
                                    })}
                                </td>
                                <td>
                                    {user.profession.name}
                                </td>
                                <td>
                                    {user.completedMeetings}
                                </td>
                                <td>
                                    {user.rate}
                                </td>
                                <td>
                                    {/* create button with method onClick that calls function handleDelete with argument user._id */}
                                    <button key = {user._id} type="button" className="btn btn-danger" onClick = {() =>{handleDelete(user._id)}}>delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>)
}

export default Users