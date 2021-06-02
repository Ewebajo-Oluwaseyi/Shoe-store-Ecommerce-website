import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import CheckoutStep from '../CheckoutSteps'
import {connect} from 'react-redux';

function Placeorderpage(props) {

   // const cart = useSelector(state => state.cart);

    const {cartItems, shipping, payment} = props.cart;
  //  console.log(cartItems)
    if(!shipping.address){
        props.history.push('/shipping');
    } else if(!payment.paymentMethod){
        props.history.push('/payment');
    }




    useEffect(() => {
         //eslint-disable-next-line
    }, [])

    const itemPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemPrice > 100?  0 : 10;
    const taxPrice = 0.15*itemPrice;
    const totalPrice = itemPrice + shippingPrice + taxPrice;

    const placeorderHandler = () => {
        //create an order
    }

    return (
        <div>
            <CheckoutStep step1 step2 step3 step4></CheckoutStep>
            <div className="placeorder">
            <div className="placeorderInfo">
                <div>
                    <h3 className="placeorderh3">Shipping</h3>
                    <div>
                        {props.cart.shipping.address}, {props.cart.shipping.city},
                        {props.cart.shipping.postalCode}, {props.cart.shipping.country}
                    </div>
                    <div className="payment">
                        <h3 className="placeorderh3">Payment</h3>
                        Payment Method: {props.cart.payment.paymentMethod}
                    </div>
                </div>
                <div>
                    <ul className="placeorderContainer">
                    <li className="placeorderContainerLi">
                        <h3 className="placeorderh3">Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    {
                        cartItems.length === 0 ? <div>Cart is empty</div>:
                        cartItems.map(item =>
                            <li className="placeorderContainerLi">
                                <div className="placeorderImage">
                                    <img src={item.image} alt=""/>
                                </div>
                                <div className="placeorderName">
                                    <div>
                                        <Link to ={"/product/" + item.product} className="a">
                                        {item.name}
                                        </Link>
                                    </div>
                                <div>
                                    Qty: {item.qty}
                                </div>
                                </div>
                                <div className="placeorderPrice">
                                    ${item.price}
                                </div>

                            </li>)
                    }
                        </ul>

                </div>

            </div>
            <div className="placeorderAction">
                <ul>

                    <li>
                        <h3 className="placeorderh3">Product Summary</h3>
                    </li>
                    <li>
                        <div>Items</div>
                        <div>${itemPrice}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>${shippingPrice}</div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div>${taxPrice}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div>${totalPrice}</div>
                    </li>
                    <li>
                        <button className="button" onClick={placeorderHandler}>Place order</button>
                    </li>
                </ul>

            </div>
        </div>
        </div>

    )
}

const mapStateToProps = state => ({
    cart: state.cart
  })



export default connect(mapStateToProps, null)(Placeorderpage)
