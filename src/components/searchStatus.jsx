import React from "react";

const SearchStatus = ({length}) => {
    // create array textForms for function renderPhrase
  const textForms = [
    "человек тусанет с тобой сегодня",
    "человека тусанет с тобой сегодня",
  ];

  // create function for rendering phrase
  const renderPhrase = (number) => {
    const arrayUsersLength = Math.abs(number) % 100;
    if (number === 0) {
      return "Никто c тобой не тусанет";
    } else if (
      (arrayUsersLength >= 5 && arrayUsersLength < 20) ||
      arrayUsersLength === 1
    ) {
      return `${number} ${textForms[0]}`;
    } else if (arrayUsersLength > 1 && arrayUsersLength < 5) {
      return `${number} ${textForms[1]}`;
    }
  };
    return (
        <span className={"badge fs-5 bg-" + (length > 0 ? 'primary' : 'danger')}>
        {`${renderPhrase(length)}`}{" "}
      </span>
    )
}

export default SearchStatus