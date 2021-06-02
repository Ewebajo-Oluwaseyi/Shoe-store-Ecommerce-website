import React, {useEffect} from 'react';
import {getCart, removeFromCart, updateFromCart} from '../../actions/cartAction'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Col, Container, Row} from 'reactstrap';


function Cartpage(props) {
    //const [value, setValue] = useState(0)
    const {cartItems} = props.cart
    //console.log(cartItems)
   // const productId = props.match.params.id;
   // console.log(productId)
    const qty = props.location.search ? Number(props.location.search.split("=")[1]): 1;

    const removeFromCartHandler = (productId) => {
      //  console.log(productId)
        props.removeFromCart(productId);
    }
    const checkoutHandler = () => {
        props.history.push("/shipping");
    }



    useEffect(() => {
            props.getCart(qty);

        //eslint-disable-next-line
    }, [])

    return (
        <div className="page-content">
            <Container>
                <Row>
                    <Col xl="12">
                        <Row>
                            <Col md="8" >
                            <div className="cartList">
                <ul className="cartListContainer">
                    <li className="cartListContainerLi">
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    {
                        cartItems.length === 0 ? <div>Cart is empty</div>:
                        cartItems.map(item =>
                            <li className="cartListContainerLi">
                                <div className="cartImage">
                                    <img src={item.image} alt=""/>
                                </div>
                                <div className="cartName">
                                    <div>
                                        <Link to ={"/product/" + item.productId} className="a">
                                        {item.name}
                                        </Link>
                                    </div>
                                <div>
                                    Qty:{"  "}
                                     <select value={item.qty} onChange={(e) => props.updateFromCart(e.target.value, item, item._id)}>
                                     {[...Array(item.countInStock).keys()].map(x=>
                                    <option key={x+1} value={x+1}>{x+1}</option>)}
                                    </select>
                                    <button type="button" className="remove" onClick={() => removeFromCartHandler(item._id)}>
                                        Remove
                                    </button>
                                </div>
                                </div>
                                <div className="cartPrice">
                                    ${item.price}
                                </div>

                            </li>)
                                      }
                </ul>
            </div>
                            </Col>
                            <Col md="4">
                            <div className="cartAction">
                                <ul className="cartActionUl">
                                      <li className="cartActionLi cartpriceli">
                                     Subtotal ( {cartItems.reduce((a, c) => a + c.qty , 0)} items )
                                        : <span className="cartprice">
                                        $ {cartItems.reduce((a, c) => a + c.price * c.qty , 0)}
                                        </span>

                                      </li>
                                      <li className="cartActionLi">
                                      <button onClick={checkoutHandler} className="checkoutbutton" disabled={cartItems === 0}>
                                    Proceed to checkout
                                    </button>
                                      </li>
                                </ul>

            </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart
  })



export default connect(mapStateToProps, {getCart, removeFromCart, updateFromCart}) (Cartpage);
