import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/qualitiesList";
// import { Link } from "react-router-dom";

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
        history.replace(`/users/${userId}/edit`);
    };

    return (
        <>
            <h2>{user.name}</h2>
            <h2>{`Профессия: ${user.profession.name}`}</h2>
            <QualitiesList qualities={user.qualities} />
            <h4>{`completed meetings: ${user.completedMeetings}`}</h4>
            <h2>{`Rate: ${user.rate}`}</h2>
            <button onClick={handleUsers}>Изменить</button>
        </>
    );
};

export default UserPage;

UserPage.propTypes = {
    userId: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
};
