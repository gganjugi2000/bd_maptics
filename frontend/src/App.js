import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Prompt
} from "react-router-dom";
import logo from './logo.svg';
import styles from './App.css';
import classNames from 'classnames/bind';

// left menu
import SideMenu from './components/SideMenu';

// users menu
import UserListContainer from './domain/User/UserListContainer';
import UserFormContainer from './domain/User/UserFormContainer';

// products menu

// stats menu


import AxiosTest from './domain/AxiosTest'


const cx = classNames.bind(styles);

function App() {
  let sideMenu = null;
  sideMenu = <SideMenu />;
  
  return (
    <Router>
      <>
      <div className={cx("root")}>
        {sideMenu}
        <div className={cx("main")}>
          <Switch>
          <Route exact path="/users"  children={<UserListContainer />} />
            <Route exact path="/users/create"  children={<UserFormContainer />} />
            <Route exact path="/products" children={<h3>Produ</h3>} />
            <Route exact path="/stats" children={<h3>Two</h3>} />
            <Route exact path="/axios_test"  component={AxiosTest} />
          </Switch>
        </div>
      </div>
      </>
    </Router>
    
  );
}

export default App;
