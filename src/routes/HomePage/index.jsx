import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../../components/Categories";
import PizzaBlock from "../../components/PizzaBlock";
import SortSelect from "../../components/SortSelect";

import { setCategory } from "../../redux/actions/filters";

import "./style.scss";

const categoryNames = ["Все", "Мясные", "Вегетерианские", "Гриль", "Острые", "Закрытые"];
const sortItems = [
  { name: "популярности", type: "popular" },
  { name: "цене", type: "price" },
  { name: "алфавиту", type: "alphabet" },
];

function HomePage() {
  const dispatch = useDispatch();

  const items = useSelector(({ pizzas }) => pizzas.items);

  const onSelectCategory = useCallback((index) => {
    // we make use of useCallback to prevent changing onSelectCategory link and not to recreate it on rerender while fetching pizzas from db on category click
    dispatch(setCategory(index));
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories onClick={onSelectCategory} items={categoryNames} />
        <SortSelect items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{
        items && items.map(({ id, imageUrl, name, price, sizes, types }) =>
          <PizzaBlock key={id} img={imageUrl} name={name} price={price} sizes={sizes} types={types} />)
        }
      </div>
    </div>
  );
}

export default HomePage;
