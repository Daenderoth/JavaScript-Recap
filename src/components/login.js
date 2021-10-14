import { useState } from "react";
import { useMutation } from "@apollo/client";
import { AUTHENTICATE_USER } from '../queries';
import { decodeToken } from 'react-jwt';

const Login = (props) => {

    const onError = (err) => {
        console.log(err);
        setFormError('Invalid credentials.');
    }

    const onLogin = (cache, {data}) => {
        setFormError('');
        let payload = decodeToken(data.authenticate);
        console.log(payload);
        localStorage.setItem('token', data.authenticate);
        if(payload.role === 'admin') props.giveAdminRights();
        props.setToken(data.authenticate);
    };

    const [formError, setFormError] = useState();
    const [credentials, setCredentials] = useState(
        {
            submitted: false,
            email: '',
            password: ''
        }
    );

    const [authenticateUser, {data, loading, error}] = useMutation(AUTHENTICATE_USER, {update: onLogin, onError: onError});

    return (
        <div class='login-page'>
            <form class='login-form' onSubmit={e => {
                e.preventDefault();

                setCredentials({...credentials, submitted: true});

                if(!(credentials.email && credentials.password))
                {
                    setFormError('Please fill in all of the fields.');
                }

                else {
                    authenticateUser({variables: {
                        authenticateEmail: credentials.email,
                        authenticatePassword: credentials.password
                    }});
                }

            }}>
                { props.tokenExpiredMessage ? <h4 class='form-error'>{props.tokenExpiredMessage}</h4> : null }
                <h3>User Login</h3>
                <div class='form-row'>
                    <input type='text' placeholder='Email address' autoFocus onChange={e=> {
                        if(credentials.submitted && !e.target.value)
                        {
                            e.target.style.border = "1px solid #cc0000";
                        }
                        else {e.target.style.border = "1px solid gray"}
                        setCredentials({...credentials, email: e.target.value})
                    }}></input>
                </div>
                <div class='form-row'>
                    <input type='password' placeholder='Password' onChange={e => {
                        if(credentials.submitted && !e.target.value)
                        {
                            e.target.style.border = "1px solid #cc0000";
                        }
                        else {e.target.style.border = "1px solid gray"}
                        setCredentials({...credentials, password: e.target.value})
                    }}></input>
                </div>
                <div class='form-button-container'>
                    <button class="bttn">Login</button>
                </div>
                <div class='form-row'>
                    <p class='form-error'>{formError}</p>
                </div>
            </form>
        </div>
    );
}

export default Login;