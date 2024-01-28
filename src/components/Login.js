import { useMutation } from '@apollo/client';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AUTH_TOKEN, SIGNUP_MUTATION, LOGIN_MUTATION} from '../constants'

const Login = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        login: true,
        email: '',
        password: '',
        name: ''
    });

    const [signup] = useMutation(SIGNUP_MUTATION, {
        variables: {
            name: formState.name,
            email: formState.email,
            password: formState.password
        },
        onCompleted: ({signup}) => {
            localStorage.setItem(AUTH_TOKEN, signup.token);
            navigate('/');
        }
    });

    const [login] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: formState.email,
            password: formState.password
        },
        onCompleted: ({login}) => {
            localStorage.setItem(AUTH_TOKEN, login.token);
            navigate('/');
        }
    });

    return (
        <div>
            <h4>
                {formState.login ? 'Login' : 'Sign Up'}
            </h4>
            <div>
                {!formState.login && (
                    <input
                        value={formState.name}
                        onChange={(e) => 
                            setFormState({
                                ...formState,
                                name: e.target.value
                            })
                        }
                        type='text'
                        placeholder='Your name'
                    />
                )}
                <input
                    value={formState.email}
                    onChange={(e) => 
                        setFormState({
                            ...formState,
                            email: e.target.value
                        })
                    }
                    type='text'
                    placeholder='Your email address'
                />
                <input
                    value={formState.password}
                    onChange={(e) =>
                        setFormState({
                            ...formState,
                            password: e.target.value
                        })
                    }
                    type='password'
                    placeholder={formState.login ? 'Your password' : 'Choose a safe password'}
                />
            </div>
            <div>
                <button onClick={formState.login ? login : signup}>
                    {formState.login ? 'login' : 'create account'}
                </button>
                <button
                    onClick={(e) =>
                        setFormState({
                            ...formState,
                            login: !formState.login
                        })
                    }
                >
                    {formState.login
                    ? 'need to create an account?'
                    : 'already have an account?'}
                </button>
            </div>
        </div>
    );
};

export default Login;