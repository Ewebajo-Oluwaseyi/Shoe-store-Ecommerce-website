import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import {register, loaduser} from '../../actions/userAction'
import {Link, withRouter} from 'react-router-dom'

const RegisterPage = (props) => {

    const {isAuthenticated} = props.userSignin

    useEffect(() => {



        /*if(error === 'User already exist') {

        }*/
        //eslint-disable-next-line
    }, [isAuthenticated])

    const [users, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = users;

    const onChange = e => setUser({...users, [e.target.name]: e.target.value });


    const onSubmit = e => {
            e.preventDefault();
            props.register({
                name,
                email,
                password
                 });
                 props.loaduser(props)
        }



    return (
        <div className="formreg">
           <form onSubmit={onSubmit}>
                <ul className="formContainer">
                    <li className="formContainerLi">
                        <h2 className="store">Shoe Store</h2>
                    </li>
                    {/*<li>
                        {loading && <div>loading..</div>}
                        {error && <div>{error}</div>}
                    </li>*/}
                    <li className="formContainerLi">
                        <label htmlFor="name" className="siginlabel">Name</label>
                        <input className="input" type="text" name="name" value={name} onChange={onChange} required></input>
                    </li>
                    <li className="formContainerLi">
                        <label htmlFor="email" className="siginlabel">Email</label>
                        <input className="input" type="email" name="email" value={email} onChange={onChange} required></input>
                    </li>
                    <li className="formContainerLi">
                        <label htmlFor="password" className="siginlabel">Password</label>
                        <input className="input" type="password" name="password" value={password} onChange={onChange} required minLength="6"></input>
                    </li>
                    <li className="formContainerLi" >
                        <label htmlFor="password" className="siginlabel">Confirm Password</label>
                        <input className="input" type="password" name="password2" value={password2} onChange={onChange} required minLength="6"></input>
                    </li>
                    <li className="formContainerLi">
                        <button type="submit" className="button">Register</button>
                    </li>
                    <li className="formContainerLi">
                        Already have an account?
                    </li>
                    <li className="formContainerLi">
                        <Link to={'/signin'} className="register">Sign In</Link>
                    </li>
                </ul>
           </form>
        </div>
    )
}

const mapStateToProps = state => ({
    userSignin: state.userSignin
})

export default withRouter(connect(mapStateToProps, {register, loaduser}) (RegisterPage))