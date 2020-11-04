import React, { useState } from 'react';
import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router';

import logo from './logo.svg';
import styles from './App.css';
import classNames from 'classnames/bind';


// left menu
import SideMenu from './components/SideMenu';


// sample menu
import SampleUserListContainer from './domain/Sample/UserListContainer';
import SampleUserFormContainer from './domain/Sample/UserFormContainer';
import SampleUserInfoContainer from './domain/Sample/UserInfoContainer';
import Main from './domain/Main';

// users menu
import UserListContainer from './domain/User/UserListContainer';
import UserFormContainer from './domain/User/UserFormContainer';
import UserInfoContainer from './domain/User/UserInfoContainer';

import AxiosTest from './domain/AxiosTest'

import List from './domain/List';

const cx = classNames.bind(styles);

function App({ history, context }) {
  let sideMenu = null;
  // let sideMenu = null;
  const [leftSize, setLeftSize] = useState(260)
  const showHideLeft = () => {
    if(leftSize === 0){
      setLeftSize(260)
    }
    else {
      setLeftSize(0)
    }
  }
    // <Router>
  return (
    <ConnectedRouter history={history} context={context}>
      <>
        <div className={cx("root")}>
          <SideMenu setLeftSize={showHideLeft} leftSize={leftSize} />
          <div className={cx("main")}>
            <Main setLeftSize={showHideLeft} leftSize={leftSize} />
            <Switch>
              <Route exact path="/users"  component={UserListContainer} />
              <Route exact path="/users/create"  component={UserFormContainer} />
              <Route exact path="/users/:id" component={UserInfoContainer} />

              <Route exact path="/products" children={<h3>Produ</h3>} />
              <Route exact path="/stats" children={<h3>Two</h3>} />
              <Route exact path="/axios_test"  component={AxiosTest} />
			        <Route exact path="/list"  children={<List />} />
              <Route exact path="/sample"  component={UserListContainer} />

              {/* Sample ===========================================================*/}
              <Route exact path="/sample"  component={SampleUserListContainer} />
              <Route exact path="/sample/create"  component={SampleUserFormContainer} />
              <Route exact path="/sample/:id" component={SampleUserInfoContainer} />
              {/* Sample end ===========================================================*/}
            </Switch>
          </div>
        </div>
      </>
    </ConnectedRouter>
  );
}

export default App;
