import React from 'react';
import './Nav.css'
import '../../assets/yinYang.css'
import {NavLink} from "react-router-dom";

const Nav: React.FC = () => {
    return <nav className='nav'>
    <Ne /><Di /><div className='yinYang'/><Us /><Pr />
    </nav>
}

const Ne = () => {return <div className='h_nav ne'><NavLink to="/news">НОВОСТИ</NavLink></div>}
const Di = () => {return <div className='h_nav di'><NavLink to="/dialogs">СООБЩЕНИЯ</NavLink></div>}
const Us = () => {return <div className='h_nav us'><NavLink to="/users">ПОЛЬЗОВАТЕЛИ</NavLink></div>}
const Pr = () => {return <div className='h_nav pr'><NavLink to="/profile">ПРОФИЛЬ</NavLink></div>}

export default Nav;