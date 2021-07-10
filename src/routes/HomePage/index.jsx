import React from "react";
import Categories from "../../components/Categories";
import PizzaBlock from "../../components/PizzaBlock";
import SortSelect from "../../components/SortSelect";

import "./style.scss";

function HomePage({ pizzas }) {
  console.log(pizzas);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClick={(item) => {
            console.log(item);
          }}
          items={["Все", "Мясные", "Вегетерианские", "Гриль", "Острые", "Закрытые"]}
        />
        <SortSelect items={["популярности", "цене", "алфавиту"]} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas.map(({ id, imageUrl, name, price, sizes }) => (
          <PizzaBlock key={id} img={imageUrl} name={name} price={price} sizes={sizes} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
