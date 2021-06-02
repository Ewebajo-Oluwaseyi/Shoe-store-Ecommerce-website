import React from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {grantPermission} from '../../GrantPermission'
import {ROLES} from '../../App.constants'

function Adminmiddleware({component: Component,layout: Layout, ...rest}) {
//  const user = JSON.parse(localStorage.getItem("user"))
  //console.log(user)
    return (
        <>
        {  grantPermission([ROLES.ADMIN]) && (
        <Route
          {...rest}
          render={(props) => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
        )}
        {
          !grantPermission([ROLES.ADMIN]) && (
            <Route
            {...rest}
            render={(props) => (
                <Redirect  to={{ pathname: "/signin", state: { from: props.location } }} />
            )}

            />

          )
        }
      </>)
}

export default withRouter(Adminmiddleware)


