import React, { useState, useEffect } from "react";
import Searchbar from "./components/searchbar";
import Bodydiv from "./components/bodydiv";
import "./styles.css";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [inputCheck, checkInputValue] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectCity, setCity] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesName = `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(inputValue.toLowerCase());
    const matchesCity = selectCity ? user.address.city === selectCity : true;
    return matchesName && matchesCity;
  });

  const oldestUsersByCity = {};
  users.forEach((user) => {
    const city = user.address.city;
    if (
      !oldestUsersByCity[city] ||
      new Date(user.birthDate) < new Date(oldestUsersByCity[city].birthDate)
    ) {
      oldestUsersByCity[city] = user;
    }
  });

  console.log("Oldest users by city:", oldestUsersByCity);

  return (
    <div className="App">
      <Searchbar
        users={users}
        inputValue={inputValue}
        setInputValue={setInputValue}
        inputCheck={inputCheck}
        checkInputValue={checkInputValue}
        selectCity={selectCity}
        setCity={setCity}
      />
      <br />
      <Bodydiv
        users={filteredUsers}
        inputCheck={inputCheck}
        oldestUsersByCity={oldestUsersByCity}
      />
    </div>
  );
}
