import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";

// Cоздаем компонент Users - Юзеры и передаем туда свойства т.е. юзеров, а также ...rest - это сбор всех оставшихся аргументов в массив
const Users = ({ users, ...rest }) => {
    // создаем хук юзстэйт для хранения состояния текущей страницы и задаем начальное значение 1
    const [currentPage, setCurrentPage] = useState(1);
    // создаем хук юзстейт для хранения профессий, там сейчас ничего нет
    const [professions, setProfession] = useState();
    // создаем хук юзстейт для хранения выбранной профессии, там сейчас ничего нет
    const [selectedProf, setSelectedProf] = useState();
    // создаем хук юзстейт для хранения состояния отсортированного массива пользователей и передаем по умолчанию объект с ключами: сортировка по имени и по возрастанию
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    // создаем переменную pageSize размер страницы, присваиваем размер 2
    const pageSize = 8;

    // тут мы используем хук useEffect, данный хук вызывает функцию обратного вызова, каждый раз, когда компонент отрисовывается. Хук useEffect используется для получения списка профессий с помощью API и установки полученных данных в переменную professions. Т.е. useEffect будет вызван один раз, так как пустой массив [] не содержит зависимостей.
    useEffect(() => {
        // после вызова функции fetchAll() у объекта api.professions данные будут получены асинхронно в виде data и они устанавливаютя в переменную профессии. После того, как данные будут установлены в состояние, компонент будет перерисован и пользователь увидит обновленный список профессий.
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    // тут мы используем хук useEffect, он вызывается один раз при отрисовке компонента и устанавливает значение переменной currentPage в значение 1, т.е. мы оказываемся на первой странице, и этот useEffect будет каждый раз отрисовывать данный компонент на странице после каждого изменения состояния компонента selectedProf и будет устанавливать currentPage в значение 1
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    // тут мы создаем функцию обработчик выбора профессий, когда пользователь нажал на нужную профессию, запускается функция обработчик выбора профессий, которая принимает в себя аргумент item и при помощи setSelectedProf item устанавливается в состояние компонента selectedProf
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    // тут создаем функцию обработчик смены страницы, когда пользователь нажал на кнопку смены страницы, запускается функция обработчик смены страницы, которая принимает в себя аргумент pageIndex и происходит обновление состояния currentPage, т.е. устанавливается значение pageIndex. И это приведет к перерисовке компонента и обновлению отображаемых данных.
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    // создаем обработчик нажатия на заголовок колонок, он принимает в себя аргумент, т.е. что мы будем обрабатывать и выводим в консоль на то что мы нажали в колонке
    const handleSort = (item) => {
        setSortBy(item);
    };

    // создаем функцию фильтрация пользователей
    // фильтруем массив объектов при помощи функции filter, функция обратного вызова принимает user в качестве аргумента и проверяет является ли свойство profession равное значению переменной selectedProf, т.е. ту профессию, которую выбрал пользователь
    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : users;

    //  создаем переменную - длина отфильтрованного списка юзеров
    const count = filteredUsers.length;

    // создаем переменную - отсортированные пользователи, для сортировки используем библиотеку lodash, 1ый параметр это отфильтрованные пользователи, второй параметр это имя пользователя, третий параметр это сортировка по возрастанию
    const usersSort = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);

    // создаем переменную обрезка пользователей, помещаем туда функцию, куда передаются отфильтрованные пользователи (массив), текущая страница, размер страницы
    const userCrop = paginate(usersSort, currentPage, pageSize);

    // создаем хук useEffect
    useEffect(() => {
        // если длина отфильмтрованного списка > 0
        if (count > 0) {
            // если длина обрезанного списка пользователей равна 0 то устанавливаем предыдущую страницу, из-за того что там ничего нет. После этого компонент будет перерисован.
            if (userCrop.length === 0) setCurrentPage((prev) => prev - 1);
        }
        // тут следим за изменениями обрезанного списка
    }, [userCrop]);

    // создаем переменную очистить фильтр
    const clearFilter = () => {
        // сбрасываем выбор профессии на пустое значение
        setSelectedProf();
    };
    //  React-компонент возвращает JSX-разметку
    return (
        // создаем общую обертку
        <div className="d-flex">
            {professions && (
                // создаем обертку для компонента GroupList и кнопки очистить
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    {/* помещаем компонент GroupList и туда передаем пропсы (атрибуты)  */}
                    <GroupList
                        // передаем через свойство selectedItem выбранную профессию
                        selectedItem={selectedProf}
                        // передаем через свойство item массив профессий
                        items={professions}
                        // передаем через свойство onItemSelect функцию handleProfessionSelect, она есть выше
                        onItemSelect={handleProfessionSelect}
                    />
                    {/* создаем кнопку и передаем через атрибут onClick функцию clearFilter, которая определена выше */}
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {/* если count > 0 то создаем таблицу */}
                {count > 0 && (
                    <UserTable
                        users={userCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        {...rest}
                    />
                )}
                {/* создаем обертку для компонента Пагинация */}
                <div className="d-flex justify-content-center">
                    {/* помещаем туда компонент Пагинация */}
                    <Pagination
                        // передаем в компонент пагинация пропсы: через свойство itemsCount передаем длину отфильтрованного списка юзеров
                        itemsCount={count}
                        // через свойство pageSize передаем размер страницы
                        pageSize={pageSize}
                        // через свойство currentPage передаем номер текущей страницы
                        currentPage={currentPage}
                        // через свойство onPageChange передаем функцию handlePageChange
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

// с помощью библиотеки prop-types определяем тип свойств (props) передаваемых в компонент Users
Users.propTypes = {
    // то есть users может быть либо объектом либо массивом
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

// экспортируем компонент Users
export default Users;
