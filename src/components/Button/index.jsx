import React from "react";

import cn from "classnames";

import "./style.scss";

function Button({ onClick, className, outline, children }) {
  const handleClick = () => {
    onClick && onClick();
  };
  return (
    <button
      className={cn(className, "button", {
        "button--outline": outline,
      })}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
