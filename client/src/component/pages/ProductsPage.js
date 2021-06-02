import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import {saveProduct, deleteProduct} from '../../actions/productsActions'
import {listProducts} from '../../actions/productsActions'
import {withRouter} from 'react-router-dom'

const ProductsPage = ({productSave,productDelete, productList: {loading, products, error}, saveProduct,listProducts, deleteProduct}) => {

   const{loading: loadingSave, success: successSave, error: errorSave} = productSave

   const{ success: successDelete} = productDelete

    useEffect(() =>{
        if(successSave){
            setModalVisible(false)
        }
        listProducts();
        return () => {
            //
        };

    }, [successSave, successDelete])



   const[modalVisible, setModalVisible] = useState(false)
   const[id, setId] = useState('');
   const[name, setName] = useState('');
   const[price, setPrice] = useState('');
   const[category, setCategory] = useState('');
   const[image, setImage] = useState('');
   const[brand, setBrand] = useState('');
   const[countInStock, setCountInStock] = useState('');

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setImage(product.image);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        saveProduct({_id: id, name, price, category, image, brand, countInStock})
    }

    const deleteHandler = (product) => {
        deleteProduct(product._id);
    }

    return (
        <div className="content">
            <div className="productHeader">
                <h3>Products</h3>
                <button className="button" onClick={() => openModal({})}>Create Product</button>
            </div>
            {modalVisible &&
            <div className="form">
            <form onSubmit={submitHandler}>
                 <ul className="formContainer">
                     <li className="formContainerLi">
                         <h2>{id ? 'Update Product': 'Create Product'}</h2>
                     </li>
                     <li>
                         {loadingSave && <div>loading..</div>}
                         {errorSave && <div>{errorSave}</div>}
                     </li>
                     <li className="formContainerLi">
                         <label htmlFor="name">Name</label>
                         <input className="input" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                     </li>
                     <li className="formContainerLi">
                         <label htmlFor="price">Price</label>
                         <input className="input" type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                     </li>
                     <li className="formContainerLi">
                         <label htmlFor="category">Category</label>
                         <input className="input" type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
                     </li>
                     <li className="formContainerLi">
                         <label htmlFor="image">Image</label>
                         <input className="input" type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)}></input>
                     </li>
                     <li className="formContainerLi">
                         <label htmlFor="brand">Brand</label>
                         <input className="input" type="text" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)}></input>
                     </li>
                     <li className="formContainerLi">
                         <label htmlFor="countInStock">Count In Stock</label>
                         <input className="input" type="text" name="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
                     </li>
                     <li className="formContainerLi">
                         <button type="submit" className="button">{id ? 'Update': 'Create'}</button>
                     </li>
                     <li className="formContainerLi">
                         <button type="submit" className="back" onClick={() => setModalVisible(false)}>Back</button>
                     </li>
                 </ul>
            </form>
         </div>}
            <div className="productList">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="th">ID</th>
                            <th className="th">Name</th>
                            <th className="th">Price</th>
                            <th className="th">Category</th>
                            <th className="th">Brand</th>
                            <th className="th">Action</th>
                        </tr>
                    </thead>
                    {loading ? <div>Loading...</div> :
                    error ? <div>{error}</div>: (
                        <tbody className="tbody">
                        {products.map(product =>
                        <tr className="tr" key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <button className="edit" onClick={()=> openModal(product)}>Edit</button>
                                <button className="delete" onClick={()=> deleteHandler(product)}>Delete</button>
                            </td>
                        </tr>
                        )}

                    </tbody>
                    )}

                </table>
            </div>


        </div>



    )
}

const mapStateToProps = state => ({
    productSave: state.productSave,
    productList: state.productList,
    productDelete: state.productDelete
})

export default withRouter(connect(mapStateToProps, {saveProduct, listProducts, deleteProduct}) (ProductsPage))