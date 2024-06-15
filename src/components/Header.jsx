import React from "react";

function Header({ overallProgress }) {
  return (
    <header className="header">
      <h1>Los últimos exploradores</h1>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${overallProgress}%` }}
        ></div>
      </div>
    </header>
  );
}

export default Header;
