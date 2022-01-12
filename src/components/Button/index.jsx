import React from "react";

import cn from "classnames";

import "./style.scss";

function Button({ onClick, className, outline, children, type = "button" }) {
  const handleClick = () => {
    onClick && onClick();
  };
  return (
    <button
      className={cn(className, "button", {
        "button_outline": outline,
      })}
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
