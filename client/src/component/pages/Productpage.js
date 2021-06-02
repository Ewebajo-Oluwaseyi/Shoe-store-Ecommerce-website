import React, {Fragment, useEffect, useState} from 'react'
import { Link} from 'react-router-dom';
import {detailsProduct} from '../../actions/productsActions'
import {addCart} from '../../actions/cartAction'
import {connect} from 'react-redux'
import { Row, Col, Container, Card, CardBody } from 'reactstrap';

const Productpage = (props) => {

    const {product}= props.productDetail
    const [qty, setQty] = useState(1);

    useEffect(() => {

        props.detailsProduct(props.match.params.id);
        //eslint-disable-next-line
        }, [])

    const handleAddToCart = () => {
       // console.log(product)
       props.addCart(product, qty, props.match.params.id)
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }


    return (
        <Fragment>
            <div className="page-content">
                <Container>
                <div className="backpage">
                <Link to="/">Back to Homepage</Link>
             </div>
             <Row>
                 <Col xl="12">
                    <Row>
                        <Col md="4" sm="6" xs="6">
                        <Card className="mb-3 card">
                            <CardBody>
                                <div>
                                <img className="detailsImageImg" src={product && product.image} alt="product" />
                                </div>
                            </CardBody>
                        </Card>
                        </Col>
                        <Col md="4" sm="6" xs="6">
                        <div className="detailsInfo">
                    <ul className="detailsInfoUl">
                        <li className="detailsInfoLi">
                            <h4 className="detailsName">{product && product.name}</h4>
                        </li>
                        <li className="detailsInfoLi">
                        Price:{"  "}<b>{product && product.price}</b>
                        </li>
                        <li className="detailsInfoLi">
                        Category:{"  "}<b>{product && product.category}</b>
                        </li>
                        <li className="detailsInfoLi">
                        Brand:{"  "}<b>{product && product.brand}</b>
                        </li>
                    </ul>
                </div>
                        </Col>
                        <Col md="4">
                        <div className="detailsAction">
                    <ul className="detailsActionUl">
                        <li className="detailsActionLi detailsActionLiname">
                             ${product && product.price}
                        </li>
                        <li className="detailsActionLi">
                            {product && product.countInStock > 0 ?<div className="stock">In Stock</div>: <div className="stock">Out of stock</div>}
                        </li>
                        <li className="detailsActionLi">
                        <span className="qty">Qty:</span>
                             <select value={qty} onChange={(e) => setQty(e.target.value)}>

                                {[...Array(product && product.countInStock).keys()].map(x=>
                                   <option key={x+1} value={x+1}>{x+1}</option>)}
                            </select>
                        </li>
                        <li className="detailsActionLi">
                            {product && product.countInStock > 0 && <button onClick={handleAddToCart} className="addcartbutton">
                                Add Cart
                            </button>}

                        </li>
                    </ul>
                </div>
                        </Col>
                    </Row>
                 </Col>
             </Row>



                </Container>

        </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    productDetail: state.productDetail
  })


export default connect(mapStateToProps, {detailsProduct, addCart}) (Productpage)