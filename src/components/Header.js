import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link to='/'>
                <div>Hacker News</div>
            </Link>

            <Link to='/'>
                new
            </Link>
            <div>|</div>
            <Link to='/create'>
                submit
            </Link>
        </div>
    );
};

export default Header;