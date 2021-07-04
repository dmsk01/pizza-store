import React, { useState } from "react";
import "./style.scss";

function Categories({ items, onClick }) {
  const [activeItem, setActiveItem] = useState(0);

  const onSelectItem = (index) => {
    setActiveItem(index);
  };
  return (
    <div className="categories">
      <ul>
        {items &&
          items.map((item, index) => (
            <li className={activeItem === index ? "active" : ""} onClick={() => onSelectItem(index)} key={`${item}-${index}`}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Categories;
