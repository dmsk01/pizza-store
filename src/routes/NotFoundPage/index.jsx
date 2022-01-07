import React from "react";
import "./style.scss";
import image from "./assets/01.png";

function NotFoundPage() {
  return (
    <div className="notFoundPageWrapper">
      <h1>
        <span>404</span> Not found
      </h1>
      <img src={image} alt="sad pizza" />
    </div>
  );
}

export default NotFoundPage;
