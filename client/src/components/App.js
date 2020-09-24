import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/Navbar/Navbar.js";
import Footer from "./views/Footer/Footer"
import UploadModelPage from './views/UploadModelPage/UploadModelPage';
import ModelDetailPage from './views/ModelDetailPage/ModelDetailPage';
import EditModelPage from './views/EditModel/EditModelPage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/model/upload" component={Auth(UploadModelPage, true)} />
          <Route exact path="/model/:modelId" component={Auth(ModelDetailPage, null)} />
          <Route exact path="/editModel/:modelId" component={Auth(EditModelPage, null)}/>
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
