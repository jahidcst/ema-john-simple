import React, { useContext } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const Login = () => {

    const {signIn} = useContext(AuthContext)

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
        .then((result) => {
            // Signed in 
            const loggedUser = result.user;
            console.log(loggedUser)
            form.reset();
          })
          .catch((error) => {
           console.log(error)
        //    setError(error.massge)
          });
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLogin}>
                <div className='form-control'>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="
                    email" name='email' id='' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name='password' id='' required />
                </div>
                <input className='submit-btn' type="submit" value="Login" />
            </form>
            <p><small>Don't have an account?  <Link to='/signUp'>Create New Account</Link></small></p>
            
            
        </div>
    );
};

export default Login;