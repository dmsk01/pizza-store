import React from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

import "./style.scss";

function CartPage() {
  return (
    <div className="container">
      <h1>Cart page!</h1>
      <Link to="/">
        <Button>Home Page</Button>
      </Link>
    </div>
  );
}

export default CartPage;
