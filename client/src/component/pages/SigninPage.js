import React, {useEffect, useState} from 'react'
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {login,loaduser} from '../../actions/userAction'

const SigninPage = (props) => {
   // const {user, loading, error, isAuthenticated} = props.userSignin

   const [users, setUser] = useState({
    email: '',
    password: ''
    });

    const {email, password } = users;


    useEffect(() => {
      //  props.history.push('/');

        //eslint-disable-next-line
        }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        props.login(props, { email, password});
       // console.log(isAuthenticated)
       props.loaduser(props)
      //  if(isAuthenticated) {
       //     props.history.push('/');
       // }
    }

    const onChange = e => {
        setUser({...users, [e.target.name]: e.target.value });
    }

    return (
        <div className="form">
           <form onSubmit={submitHandler}>
                <ul className="formContainer">
                    <li className="formContainerLi">
                        <h2 className="store">Shoe Store</h2>
                    </li>
                    {/*<li>
                        {loading && <div>loading..</div>}
                        {error && <div>{error}</div>}
                    </li>*/}
                    <li className="formContainerLi">
                        <label htmlFor="email" className="siginlabel">Email</label>
                        <input className="input" type="email" name="email" id="email" onChange={onChange}></input>
                    </li>
                    <li className="formContainerLi">
                        <label htmlFor="password" className="siginlabel">Password</label>
                        <input className="input" type="password" name="password" id="password" onChange={onChange}></input>
                    </li>
                    <li className="formContainerLi">
                        <button type="submit" className="button">Sign In</button>
                    </li>
                    <li className="formContainerLi">
                        New to Onlinestore?
                    </li>
                    <li className="formContainerLi">
                        <Link to={'/register'} className="register">
                            Create a new Account
                        </Link>
                    </li>
                </ul>
           </form>
        </div>
    )
}

const mapStateToProps = state => ({
   userSignin: state.userSignin

})

export default withRouter(connect(mapStateToProps, {login, loaduser}) (SigninPage))