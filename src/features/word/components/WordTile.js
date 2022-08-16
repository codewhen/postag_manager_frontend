import React, { useState } from "react";

export default function WordTile({ label }) {
  const [isDropdownShown, setisDropdownShown] = useState(false);
  const onDropDownClick = async (e) => {
    const allWithClass = Array.from(
      document.getElementsByClassName("dropdown-content")
    );
    allWithClass.forEach((element) => {
      element.classList.remove("show");
    });
    setisDropdownShown((e) => !e);
  };

  return (
    <div className="word-elements">
      <div className="word-left  word-card">
        <p>{label}</p>
      </div>
      <div className="dropdown word-drop">
        <button
          onclick="myFunction()"
          class="dropbtn"
          onClick={onDropDownClick}
        >
          Dropdown{" "}
        </button>
        <div className={`dropdown-content ${isDropdownShown ? "show" : ""}`}>
          <button>Link 1</button>
          <button>Link 2</button>
          <button>Link 3</button>
        </div>
      </div>
    </div>
  );
}
