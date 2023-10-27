import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AUTH_TOKEN} from '../constants';

const Header = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
        <div>
            <div>
                <Link to='/'>
                    <div>Hacker News</div>
                </Link>
                <Link to='/'>
                    new
                </Link>
                <div>|</div>
                <Link to='/search'>
                    search
                </Link>
                {authToken && (
                    <div>
                        <div>|</div>
                        <Link to='/create'>
                            submit
                        </Link>
                    </div>
                )}
            </div>
            <div>
                {authToken ? (
                    <div onClick={() => {
                        localStorage.removeItem(AUTH_TOKEN);
                        navigate('/');
                    }}>
                        logout
                    </div>
                ) : (
                    <Link to='/login'>
                        login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;