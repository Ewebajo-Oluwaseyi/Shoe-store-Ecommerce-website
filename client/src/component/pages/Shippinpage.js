import React, {useState} from 'react'
import {saveShipping} from '../../actions/cartAction'
import CheckoutStep from '../CheckoutSteps'
import {connect} from 'react-redux';

const ShippingPage = (props) => {


    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');


    const onSubmit = e => {
            e.preventDefault();
            props.saveShipping({
                address,
                city,
                postalCode,
                country
                 });
            props.history.push('/payment')

        }



    return (<div>
            <CheckoutStep step1 step2 ></CheckoutStep>
            <div className="form">
           <form onSubmit={onSubmit}>
                <ul className="formContainer">
                    <li className="formContainerLi">
                        <h2>Shipping</h2>
                    </li>
                    <li className="formContainerLi">
                        <label htmlFor="address">Address</label>
                        <input className="input" type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required></input>
                    </li>
                    <li className="formContainerLi">
                        <label htmlFor="city">City</label>
                        <input className="input" type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} required></input>
                    </li>
                    <li className="formContainerLi">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input className="input" type="text" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} ></input>
                    </li>
                    <li className="formContainerLi">
                        <label htmlFor="country">Country</label>
                        <input className="input" type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)} ></input>
                    </li>
                    <li className="formContainerLi">
                        <button type="submit" className="button">Continue</button>
                    </li>

                </ul>
           </form>
        </div>
        </div>

    )
}


export default connect(null, {saveShipping}) (ShippingPage)