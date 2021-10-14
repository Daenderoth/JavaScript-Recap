import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from '../queries';
// import { FormBuilder, FieldGroup, FieldControl, Validators, FormGroup, FormControl } from "react-reactive-form";

// const TextInput = ({ handler, touched, invalid, hasError, meta }) => (
//     <div class='form-row'>
//       <label>{meta.label}</label>
//       <input placeholder={meta.label} type={meta.type} className={ touched && invalid ? 'error-border' : ''} {...handler()}/>
//       { touched && hasError('required') ? <p class='form-error-field'>{meta.label} is required.</p> : null }
//       { touched && hasError('email') ? <p class='form-error-field'>Please provide a valid email address.</p> : null }
//       { touched && hasError('minLength') ? <p class='form-error-field'>{meta.label} must contain at least 6 characters.</p> : null }
//     </div>  
// );

// const SelectInput = ({ handler, touched, invalid, hasError, meta }) => (
//     <div class='form-row'>
//         <label>{meta.label}</label>
//         <select {...handler()}>
//             <option value='user'>User</option>
//             <option value='admin'>Admin</option>
//         </select>
//     </div>
// );

const Registration = (props) => {

    let headers = {'Authorization': 'Bearer ' + props.user.token};

    const clearForm = () => {
        document.getElementById('registerForm').reset();
        setUserData({
            submitted: false,
            email: '',
            password: '',
            role: 'user',
            username: ''
        });
    };

    const onError = (err) => {
        console.log(err);
        setFormErrors({
            ...formErrors,
            generalError: 'Invalid credentials.'
        });
    }

    const onRegister = (cache, {data}) => {
        setFormErrors({
            usernameError: '',
            emailError: '',
            passwordError: '',
            generalError: ''
        });
        console.log(data.register);
        if(data.register.statusCode === 400)
        {
            setFormErrors({
                usernameError: '',
                emailError: '',
                passwordError: '',
                generalError: 'An account with that email address already exists.'
            });
        } 
        else {
            clearForm();
            setFormErrors({usernameError: '',
            emailError: '',
            passwordError: '',
            generalError: ''});
            setSuccessMessage('Account created successfully!');
        }
        
    };

    function ValidateEmail(email) 
    {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }

    const [successMessage, setSuccessMessage] = useState();
    const [formErrors, setFormErrors] = useState(
        {
            usernameError: '',
            emailError: '',
            passwordError: '',
            generalError: ''
        }
    );
    const [userData, setUserData] = useState(
        {
            submitted: false,
            email: '',
            password: '',
            role: 'user',
            username: ''
        }
    );

    const [registerUser, {data, loading, error}] = useMutation(REGISTER_USER, {context: {headers} ,update: onRegister, onError: onError});

    return (
        <div class='login-page'>
            <form class='login-form' id='registerForm' onSubmit={e => {
                e.preventDefault();
                setSuccessMessage('');

                let emailError, usernameError, passwordError = '';

                let submitForm = true;

                setUserData({...userData, submitted: true});

                if(!userData.username)
                {
                    usernameError = 'Please enter a username.';
                    submitForm = false;
                }

                if(userData.password.length < 6)
                {
                    passwordError = 'Password must contain at least 6 characters.';
                    submitForm = false;
                }

                if(!ValidateEmail(userData.email))
                {
                    emailError = 'Not a valid email address.';
                    submitForm = false;
                }

                if(!submitForm)
                {
                    setFormErrors({emailError, usernameError, passwordError, generalError: ''});

                }
                
                if(submitForm)
                {
                    registerUser({variables: {
                        username: userData.username,
                        email: userData.email,
                        password: userData.password,
                        role: userData.role
                    }});
                }
                
            }}>
                <h3>User Account Creation</h3>
                <div class='form-row'>
                    <input type='text' placeholder='Email address' onChange={e=> {
                        if(userData.submitted && !e.target.value)
                        {
                            e.target.style.border = "1px solid #cc0000";
                        }
                        else {e.target.style.border = "1px solid gray"}
                        setUserData({...userData, email: e.target.value})
                    }}></input>
                    { formErrors.emailError ? <p class='form-error-field'>{ formErrors.emailError }</p> : null }
                </div>
                <div class='form-row'>
                    <input type='text' placeholder='Username' onChange={e => {
                        if(userData.submitted && !e.target.value)
                        {
                            e.target.style.border = "1px solid #cc0000";
                        }
                        else {e.target.style.border = "1px solid gray"}
                        setUserData({...userData, username: e.target.value})
                    }}></input>
                    { formErrors.usernameError ? <p class='form-error-field'>{ formErrors.usernameError }</p> : null }
                </div>
                <div class='form-row'>
                    <input type='password' placeholder='Password' onChange={e => {
                        if(userData.submitted && !e.target.value)
                        {
                            e.target.style.border = "1px solid #cc0000";
                        }
                        else {e.target.style.border = "1px solid gray"}
                        setUserData({...userData, password: e.target.value})
                    }}></input>
                    { formErrors.passwordError ? <p class='form-error-field'>{ formErrors.passwordError }</p> : null }
                </div>
                <div class='form-row'>
                    <label for='role'>User role</label>
                    <select name='role' onChange={e=> {
                        setUserData({...userData, role: e.target.value})
                    }}>
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                    </select>
                </div>
                <div class='form-button-container'>
                    <button class="bttn">Create Account</button>
                </div>
                <div class='form-row'>
                    { formErrors.generalError ? <p class='form-error'>{formErrors.generalError}</p> : null }
                    { successMessage ? <p class='success'>{successMessage}</p> : null }
                </div>
            </form>
        </div>
    )
};

export default Registration;