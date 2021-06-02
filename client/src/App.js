import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {loaduser} from './actions/userAction';
import store from './store'
import verticalLayout from './component/layout/vericalLayout'
import nonAuthLayout from './component/layout/nonAuthLayout'
import {userRoutes, authRoutes} from './routes/routes'
import {adminRoutes} from './routes/adminroutes'
import PrivateRoute from './routes/routing/PrivateRoute'
import Adminmiddleware from './routes/routing/Adminmiddleware'
import './assests/scss/app.scss'

const App = (props) => {

  useEffect(() => {

    store.dispatch(loaduser());

  }, )

  const appScreen = () => {
    let Layout = verticalLayout;

    const NonAuthMiddleware = ({
      component: Component,
      layout: Layout,
    }) => (
      <Layout>
        <Component {...props}/>
      </Layout>
    )
    return(
      <Fragment>
        <Router>
          <Switch>
            {authRoutes.map((route, id) => (
              <NonAuthMiddleware
                path={route.path}
                component={route.component}
                key={id}
                layout={nonAuthLayout}
              />
            ))}
            {userRoutes.map((route, id) => (
              <PrivateRoute
                path={route.path}
                component={route.component}
                key={id}
                layout={Layout}
              />
            ))}
            {adminRoutes.map((route, id) => (
              <Adminmiddleware
                path={route.path}
                component={route.component}
                key={id}
                layout={Layout}
              />
            ))}
          </Switch>
        </Router>
      </Fragment>
    )
  }

  return (
    <div>
      {appScreen()}
    </div>
  );
}


export default App;


 {/* <Router>
    <div className="grid-container">
      <Header/>
      <main className="main">
      <div className="content">
      <Switch>
      <PrivateRoute exact path='/' component={Homepage}/>
      <Route exact path="/register" render={props =>(
        <Fragment>
          <RegisterPage props={props}/>
        </Fragment>
      )}/>
      <Route exact path="/signin" render={props =>(
        <Fragment>
          <SigninPage props={props}/>
        </Fragment>
      )}/>
      <Route exact path="/cart/:id?" render={props =>(
        <Fragment>
          <CartPage props={props}/>
        </Fragment>
      )}/>
      <Route exact path="/shipping" render={props =>(
        <Fragment>
          <Shippinpage props={props}/>
        </Fragment>
      )}/>
      <Route exact path="/payment" render={props =>(
        <Fragment>
          <PaymentPage props={props}/>
        </Fragment>
      )}/>
      <Route exact path="/placeorder" render={props =>(
        <Fragment>
          <Placeorderpage props={props}/>
        </Fragment>
      )}/>
      <Route exact path="/product/:id" render={props =>(
        <Fragment>
          <Productpage props={props}/>
        </Fragment>
      )}/>
      <Route exact path="/products" render={props =>(
        <Fragment>
          <ProductPage props={props}/>
        </Fragment>
      )}/>
      </Switch>
      </div>
      </main>
      <Footer/>
    </div>
      </Router>*/}