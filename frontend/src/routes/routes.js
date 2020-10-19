import React from 'react'
import { Route, Switch } from 'react-router'

import logo from '../logo.svg';
import styles from '../App.css';
import classNames from 'classnames/bind';

// left menu
import SideMenu from '../components/SideMenu';

// users menu
import UserListContainer from '../domain/User/UserListContainer';
import UserFormContainer from '../domain/User/UserFormContainer';
import UserInfoContainer from '../domain/User/UserInfoContainer';

// products menu

// stats menu
/* <div>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/hello" component={Hello} />
      <Route path="/counter" component={Counter} />
      <Route component={NoMatch} />
    </Switch>
  </div> */


 import AxiosTest from '../domain/AxiosTest';


const cx = classNames.bind(styles);

const routes = () => {
    const sideMenu = SideMenu;
    return (
      <div className={cx("root")}>
        {sideMenu}
        <div className={cx("main")}>
            <Switch>
              <Route exact path="/users" component={UserListContainer} />
              <Route exact path="/users/create" component={UserFormContainer} />
              <Route exact path="/users/:id" component={UserInfoContainer} />
              
              <Route exact path="/axios_test" component={AxiosTest} />
            </Switch>
        </div>
      </div>        
    );
}

export default routes