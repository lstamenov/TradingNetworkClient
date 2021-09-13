import React from 'react';
import './index.css';
import { Route, Switch } from 'react-router';
import './App.css';
import {Link} from 'react-router-dom';
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
import {useState, useEffect} from 'react';
import authService from './services/auth.service';
import myProfilePic from './profile.png';
import UserProfile from './components/user/UserProfile';

function App() {
    
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div>
       <div className="nav">
            {currentUser ? 
            (<div className="auth-btns">
                <Link to={`user/${currentUser.username}`}><img id="profili-link-pic" src={myProfilePic}></img></Link>
                <button onClick={authService.logout}><Link to="login">Logout</Link></button>
            </div>) : (
              <div className="auth-btns">
                <button><Link to="/login">Login</Link></button>
                <button><Link to="/register">Sign Up</Link></button>
              </div>
            )}
            <button className="btn"><Link to="/">Home</Link></button>
            <button className="btn"><Link to="/about">About</Link></button>
            <button className="btn"><Link to="/items">Items</Link></button>
        </div>
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
        <Route path="/user/:username" exact>
          <UserProfile />
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
