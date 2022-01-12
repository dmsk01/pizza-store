import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SortSelect, PizzaBlock, Categories, PizzaLoader } from "../../components";

import { setCategory, setSortBy } from "../../redux/actions/filters";
import { fetchPizzas } from "../../redux/actions/pizzas";
import { addPizzaToCart } from "../../redux/actions/cart";

import "./style.scss";

const categoryNames = ["Мясные", "Вегетерианские", "Гриль", "Острые", "Закрытые"];

const sortItems = [
  { name: "популярности", type: "rating", order: "desc" },
  { name: "цене", type: "price", order: "asc" },
  { name: "алфавиту", type: "name", order: "asc" },
];

function HomePage() {
  const dispatch = useDispatch();

  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filter }) => filter);

  const onSelectCategory = useCallback((index) => {
    // we make use of useCallback to prevent changing onSelectCategory link and not to recreate it on rerender while fetching pizzas from db on category click
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  }, [category, sortBy]);

  const handleAddPizzaToCart = (pizzaObj) => {
    dispatch(addPizzaToCart(pizzaObj));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={category} onClickCategory={onSelectCategory} items={categoryNames} />
        <SortSelect activeSortType={sortBy.type} onClickSortType={onSelectSortType} items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map(({ id, imageUrl, name, price, sizes, types }) => <PizzaBlock addedPizzasToCartCount={cartItems[id]?.items.length} onAddPizza={handleAddPizzaToCart} key={id} id={id} img={imageUrl} name={name} price={price} sizes={sizes} types={types} />)
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoader key={index} />)}
      </div>
    </div>
  );
}

export default HomePage;
