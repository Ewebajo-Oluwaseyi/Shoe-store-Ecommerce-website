import React, {useEffect} from 'react'
import Header from './Header';
import Footer from './Footer';
import {withRouter} from 'react-router-dom'

function VericalLayout(props) {
    const capitalizeFirstLetter = string => {
        return string.charAt(1).toUpperCase() + string.slice(2);
      };

      useEffect(() => {
        let currentage = capitalizeFirstLetter(props.location.pathname);

        document.title =
          currentage + "Shoe-Store";
      }, [props.location.pathname])

    return (
        <div className="grid-container">
           <Header />
           <div className="main">
                {props.children}
            </div>
           <Footer />
        </div>
    )
}

export default withRouter(VericalLayout)
