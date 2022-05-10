import React from "react";
import {NavLink} from "react-router-dom";
import tg from "../../assets/images/tg.png";

type ContactPropsType = {
    contactTitle: string
    contactValue: string | null
}

export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    if (contactValue) {
        return <div className='profileContactBlock__contact'><NavLink to={contactValue}><img
            className='profileContactBlock__contactImg' src={tg} alt='contacts'/></NavLink></div>
    } else {
        return <div className='profileContactBlock__contact'><img
            className='profileContactBlock__contactImg' src={tg} alt='contacts'/></div>
    }
};