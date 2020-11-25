import React, { useState } from 'react';
import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router';

import logo from './logo.svg';
import styles from './App.css';
import classNames from 'classnames/bind';

// router
import RedirectPage from './routes/RedirectPage';

// left menu
import SideMenu from './components/SideMenu';
// header
import Header from './components/Header/Header';
// footer
import Footer from './components/Footer/Footer';



// 광고주 관리
import AdvertiserLayout from './domain/Advertiser/AdvertiserLayout';

// 캠페인 관리
import CampaignLayout from './domain/Campaign/CampaignLayout';
import CampaignFormContainer from './domain/Campaign/CampaignFormContainer';
import CampaignInfoContainer from './domain/Campaign/CampaignInfoContainer';

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
            <div className={cx("container")} style={{'transform': `translate3d(${leftSize === 260 ? '0' : '-260px'}, 0, 0)`, width : `calc(100% - ${leftSize}px)`}}>
              <Header setLeftSize={showHideLeft} leftSize={leftSize} />
              <div className={cx("contents")}>
                <Switch>
                  <Route exact path="/" component={RedirectPage} />
                  {/* 광고주 관리 */}
                  <Route exact path="/advertiser" component={AdvertiserLayout} />

                  {/* 캠페인 관리 */}
                  <Route exact path="/campaign" component={CampaignLayout} />
                  <Route exact path="/campaign/create" component={CampaignFormContainer} />
                  <Route exact path="/campaign/:id" component={CampaignInfoContainer} />
                  

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
          <Footer />
        </div>
      </>
    </ConnectedRouter>
  );
}

export default App;
