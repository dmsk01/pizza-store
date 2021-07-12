import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import { connect } from "react-redux";

import HomePage from "./routes/HomePage";
import CartPage from "./routes/CartPage";
import NotFoundPage from "./components/NotFoundPage";
import Header from "./components/Header";

import { setPizzas as setPizzasAction } from "./redux/actions/pizzas";

import "./scss/app.scss";

// function App() {
//   // const [pizzas, setPizzas] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/db.json")
//       .then((resp) => resp.json())
//       .then((json) => {
//         setPizzas(json.pizzas);
//       });
//   }, []);

//   return (
//     <div className="wrapper">
//       <Header />
//       <div className="content">
//         <Switch>
//           <AnimatedSwitch atEnter={{ opacity: 0 }} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }} className="switch-wrapper">
//             <Route exact path="/" render={() => <HomePage pizzas={pizzas} />} />
//             <Route exact path="/cart" component={CartPage} />
//             <Route path="/404" component={NotFoundPage} />
//             <Redirect to="/404" />
//           </AnimatedSwitch>
//         </Switch>
//       </div>
//     </div>
//   );
// }

class App extends React.Component {
  componentDidMount() {
    fetch("http://localhost:3000/db.json")
      .then((resp) => resp.json())
      .then((data) => {
        this.props.setPizzas(data.pizzas);
      });
  }
  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <Switch>
            <AnimatedSwitch atEnter={{ opacity: 0 }} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }} className="switch-wrapper">
              <Route exact path="/" render={() => <HomePage pizzas={this.props.items} />} />
              <Route exact path="/cart" component={CartPage} />
              <Route path="/404" component={NotFoundPage} />
              <Redirect to="/404" />
            </AnimatedSwitch>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.pizzas.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPizzas: (items) => dispatch(setPizzasAction(items)),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
