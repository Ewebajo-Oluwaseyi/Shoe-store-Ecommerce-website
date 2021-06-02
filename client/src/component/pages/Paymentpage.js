import React, {useState} from 'react'
import {savePayment} from '../../actions/cartAction'
import CheckoutStep from '../CheckoutSteps'
import {connect} from 'react-redux';

const PaymentPage = (props) => {


    const [paymentMethod, setPayementMethod] = useState('');


    const onSubmit = e => {
            e.preventDefault();
            props.savePayment({
                paymentMethod
                 });

         //   console.log(paymentMethod)
            props.history.push('placeorder')


        }



    return (<div>
            <CheckoutStep step1 step2 step3></CheckoutStep>
            <div className="form">
           <form onSubmit={onSubmit}>
                <ul className="formContainer">
                    <li className="formContainerLi">
                        <h2>Shipping</h2>
                    </li>
                    <div className="payment">
                        <input className="input" type="radio" name="paymentMethod" value="Paypal" onChange={(e) => setPayementMethod(e.target.value)}></input>
                        <label className="paymentinput" htmlFor="paymentMethod">Paypal</label>
                    </div>
                    <div className="paymentdiv">
                        <input className="input" type="radio" name="paymentMethod" value="credit card" onChange={(e) => setPayementMethod(e.target.value)}></input>
                        <label className="paymentinput" htmlFor="paymentMethod">Credit Card</label>
                    </div>
                    <li className="formContainerLi paymentbtn">
                        <button type="submit" className="button">Continue</button>
                    </li>

                </ul>
           </form>
        </div>
        </div>

    )
}


export default connect(null, {savePayment})  (PaymentPage)