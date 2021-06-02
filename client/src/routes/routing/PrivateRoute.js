import React from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {grantPermission} from '../../GrantPermission'
import {ROLES} from '../../App.constants'

function PrivateRoute({component: Component,layout: Layout, ...rest}) {


    return (
        <>
        {  grantPermission([ROLES.CLIENT]) && (
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
          ! grantPermission([ROLES.CLIENT]) && (
            <Route
            {...rest}
            render={(props) => (
                <Redirect  to={{ pathname: "/signin", state: { from: props.location } }} />
            )}

            />

          )
        }
      </>
        )
}

export default withRouter(PrivateRoute)

/*return (
    <Route { ...rest} render={props => localStorage.getItem('token') ? (
        <Layout>
            <Component {...props}/>
        </Layout>
    ) : (
        <Redirect to='/signin'/>
    )} />


      <Route { ...rest} render={ grantPermission([ROLES.CLIENT]) ? (
            <Layout>
                <Component {...props}/>
            </Layout>
        ) : (
            <Redirect to='/signin'/>
        )} />
)*/
