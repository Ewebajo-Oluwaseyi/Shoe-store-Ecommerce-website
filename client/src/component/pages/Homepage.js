import React, {useEffect, Fragment, useState, useRef} from 'react';
import {Link, withRouter} from 'react-router-dom'
import {listProducts, searchProducts, clearSearch} from '../../actions/productsActions'
import {connect} from 'react-redux'
import { Col, Container, Row, Card, CardBody, Form, Input, Button, FormGroup } from 'reactstrap';
//import { productListReducer } from '../../reducer/productReducer';

const Homepage = (props) => {
    //const[productList, setProductList] = useState([])
  const {search, products} = props.productList
  //  const {products} = props.productSearch
    const text = useRef('')
    const[term, setTerm] = useState('')
    useEffect(() => {
        props.listProducts();
       // setProductList(products)

        /*if(props.productList === null) {
            text.current.value = ''
        }*/
        //eslint-disable-next-line
        }, [])
        //console.log(products)


    const searchHandle = e => {
        e.preventDefault();
       if(text.current.value !== '') {
        props.searchProducts(term);
       } else {
        props.clearSearch();
       }

    }
    return (
        <Fragment>
            <div className="page-content">
                <Container>
                <div className="search"  aria-labelledby="searchInput">
                               <Form className="" onSubmit={searchHandle}>
                                 <FormGroup className="form-group m-0">
                                   <div className="input-group">
                                     <Input type="text" className="form-control p-2 searchform inputsearch" onChange={(e)=> setTerm(e.target.value)} placeholder="Search..." aria-label="searchInput" ref={text}/>
                                     <Button className="btn btn-warning p-1" type="submit"><i className="mdi mdi-magnify searchicon"></i></Button>
                                   </div>

                                 </FormGroup>

                               </Form>
                             </div>
                    <Row>
                        <Col xl="12">
                            <Row>

                {search == null ? products && products.map((product, key) =>
                <Col md="3" sm="6" xs="6" key={"_col_" + key}>
                    <Card className="mb-3 card">
                        <CardBody>
                        <div key={product && product._id} className="productsLi">
                        <div className="product">
                            <Link to={product && '/product/'+ product._id}>
                                <img className="productImage" src={product && product.image} alt="product"/>
                            </Link>
                            <div>
                                <Link className="productName" to={product && '/product/'+ product._id}>{product && product.name}</Link>
                            </div>
                            <div className="brand">{product && product.brand}</div>
                            <div className="price">${product && product.price}</div>
                        </div>
                    </div>
                        </CardBody>
                    </Card>
                </Col>)
                : search && search.map((product, key) =>
                <Col md="3" sm="6" xs="6" key={"_col_" + key}>
                    <Card className="mb-3 card">
                        <CardBody>
                        <div key={product && product._id} className="productsLi">
                        <div className="product">
                            <Link to={product && '/product/'+ product._id}>
                                <img className="productImage" src={product && product.image} alt="product"/>
                            </Link>
                            <div>
                                <Link className="productName" to={product && '/product/'+ product._id}>{product && product.name}</Link>
                            </div>
                            <div className="brand">{product && product.brand}</div>
                            <div className="price">${product && product.price}</div>
                        </div>
                    </div>
                        </CardBody>
                    </Card>
                </Col>)}

                            </Row>
                        </Col>

                    </Row>
                </Container>
            </div>



        </Fragment>
    )
}

const mapStateToProps = state => ({
    productList: state.productList,
  //  productSearch: state.productSearch
  })


  export default withRouter(connect(mapStateToProps, {listProducts, searchProducts, clearSearch}) (Homepage))
