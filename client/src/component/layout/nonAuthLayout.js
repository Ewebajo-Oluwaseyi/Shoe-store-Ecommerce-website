import React, {Fragment, useEffect} from 'react'
import {withRouter} from 'react-router-dom'

function NonAuthLayout(props) {

    const capitalizeFirstLetter = string => {
        return string.charAt(1).toUpperCase() + string.slice(2);
      };

      useEffect(() => {
        let currentage = capitalizeFirstLetter(props.location.pathname);

        document.title =
          currentage + " | Shoe-Store";
      }, [props.location.pathname])
    //console.log(props)
    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}

export default (withRouter(NonAuthLayout))
