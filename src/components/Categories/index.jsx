import React, { memo } from "react";
import "./style.scss";

const Categories = memo(({ activeCategory, items, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        <li className={activeCategory === null ? "active" : ""} onClick={() => onClickCategory(null)}>
          Все
        </li>
        {items &&
          items.map((item, index) => (
            <li className={activeCategory === index ? "active" : ""} onClick={() => onClickCategory(index)} key={`${item}-${index}`}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
});

export default Categories;
