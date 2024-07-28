import React from "react";

export default function Searchbar({
  inputValue,
  setInputValue,
  inputCheck,
  checkInputValue,
  users,
  selectCity,
  setCity,
}) {
  const cities = [...new Set(users.map((user) => user.address.city))];

  return (
    <center>
      <>
        <div className="searchbar">
          <div>
            <h1>Name</h1>
            <input
              type="text"
              className="txt"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div>
            <h1>City</h1>
            <select
              className="txt"
              id="dropdown"
              value={selectCity}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h1>Highlight oldest per city</h1>
            <input
              type="checkbox"
              checked={inputCheck}
              onChange={(e) => checkInputValue(e.target.checked)}
            />
          </div>
        </div>
      </>
    </center>
  );
}
