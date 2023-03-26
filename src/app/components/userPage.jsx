import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = ({ userId, history }) => {
    // создаем хук useState для хранения состояния users, в качестве начального значения установим значение из метода
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (!user) {
        return <h3>Loading...</h3>;
    }

    const handleUsers = () => {
        console.log("handleUsers");
        history.replace("/users");
    };

    return (
        <>
            <h2>{user.name}</h2>
            <h2>{`Профессия: ${user.profession.name}`}</h2>
            <QualitiesList qualities={user.qualities} />
            <h4>{`completed meetings: ${user.completedMeetings}`}</h4>
            <h2>{`Rate: ${user.rate}`}</h2>
            <button onClick={handleUsers}>Все пользователи</button>
        </>
    );
};

export default UserPage;

UserPage.propTypes = {
    userId: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
};
