import React from "react";
import PropTypes from "prop-types";

// создаем компонент GroupList - список групп и сразу сделаем деструктуризацию объекта пропс, получаем items - массив профессий, valueProperty - значение свойства, contentProperty - содержание свойства, onItemSelect (handleProfessionSelect - обработчик выбора профессий), selectedItem (selectedProf - выбранная профессия)
const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    // создаем JSX - разметку
    return (
        // создаем тег unordered-list
        <ul className="list-group">
            {/* применяем тернарный оператор если тип items (профессии) объект */}
            {!Array.isArray(items) && typeof items === "object"
                ? Object.keys(items).map((item) => (
                      // создаем тег li, устанавливаем атрибуту key (в массиве проф)
                      <li
                          key={items[item][valueProperty]}
                          className={
                              "list-group-item" +
                              (items[item] === selectedItem ? " active" : "")
                          }
                          onClick={() => onItemSelect(items[item])}
                          role="button"
                      >
                          {items[item][contentProperty]}
                      </li>
                  ))
                : items.map((item) => (
                      // создаем тег li с ключом item (id профессии)
                      <li
                          key={item[valueProperty]}
                          // присваиваем класс list-group-item, если item[_id]- id профессии равен selectedItem[_id] - id выбранной профессии то мы расширяем класс, т.е. добавляем active иначе ничего
                          className={
                              "list-group-item" +
                              (item === selectedItem ? " active" : "")
                          }
                          // добавляем атрибут onClick к нему присваиваем функцию обратного вызова, которая запускает функцию (handleProfessionSelect - обработчик выбора профессий, куда передаем элемент массива)
                          onClick={() => onItemSelect(item)}
                          role="button"
                      >
                          {/* выводим название профессии */}
                          {item[contentProperty]}
                      </li>
                  ))}
        </ul>
    );
};

// устанавливаем значения по умолчанию valueProperty и contentProperty
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

// с помощью библиотеки prop-types определяем тип свойств (props) передаваемых в компонент GroupList
GroupList.propTypes = {
    // для пропса items тип данных должен быть либо массив, либо объект
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
};

// экспортируем компонент GroupList
export default GroupList;
