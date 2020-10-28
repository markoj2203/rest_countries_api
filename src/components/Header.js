import React from "react";
import moonImg from "../images/moon.svg";

const Header = () => {
  const handleClick = () => {
    var bodyElement = document.body;
    bodyElement.classList.toggle("dark-mode");
  };

  return (
    <div>
      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-sm-6" style={{ textAlign: "center" }}>
          <h4>Where in the world?</h4>
        </div>
        <div
          className="col-sm-6"
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={handleClick}
        >
          <img src={moonImg} style={{ width: "25px", height: "25px" }} />
          <span style={{ paddingLeft: "2%" }}>Dark mode</span>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
