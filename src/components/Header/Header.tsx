import React from 'react';
import './Header.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../REDUX/redux-store";

const Header: React.FC = () => {
    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)
    const login = useSelector((state:AppStateType) => state.auth.login)
    return <header className='header'>
        SCLNTWRK<b className='header__PRO'>PRO</b>
        <div className='loginBlock'>
            {isAuth ? login :<NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
};

export default Header;