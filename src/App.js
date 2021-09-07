import React from 'react';
import Nav from './components/Nav';
import './index.css';
import { Route, Switch } from 'react-router';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Faq from './components/faq/Faq';
import AddPost from './components/addpost/AddPost';
import Items from './components/items/Items';
import ListItems from './components/listitems/ListItems';
import NotFound from './components/erropage/NotFound';
import Order from './components/order/Order';
import SuccessfulOrder from './components/order/SuccessfulOrder';
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/successful-order">
          <SuccessfulOrder />
        </Route>
        <Route path="/order/:id" exact>
          <Order />
        </Route>
      <Route path="/items/:id" exact>
         <Items />
        </Route>
        <Route path="/items" exact>
          <ListItems />
        </Route>
        <Route path="/about" exact>
         <About />
        </Route>
        <Route path="/faq" exact>
          <Faq />
        </Route>
        <Route path="/add-post" exact>
          <AddPost />
        </Route>
        <Route path="/login" exact>
          {localStorage.getItem('user') ? <NotFound /> : <Login />}
        </Route>
        <Route path="/" exact>
         <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
    );
}

export default App;
