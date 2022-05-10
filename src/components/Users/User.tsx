import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/man.jpeg";
import React from "react";
import {UserType} from "../../REDUX/users-reducer";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {
    const userId = user.id
    return (
        <div className='userBlock'>
            <div>
                <NavLink to={'/profile/' + userId}>
                    <img src={user.photos.small != null ? user.photos.small :
                        userPhoto} alt={'user'} className='photoUser photoUser-Users'/>
                </NavLink>
            </div>
            <div className='userName'>{user.name}</div>
            <div className='userStatus'>{user.status}</div>
            <div>
                {user.followed
                    ? <button className='usersButton unfollowButton'
                              disabled={followingInProgress.some(id => id === userId)}
                              onClick={() => {
                                  unfollow(userId)
                              }}>
                        Удалить</button>
                    : <button className='usersButton followButton'
                              disabled={followingInProgress.some(id => id === userId)}
                              onClick={() => {
                                  follow(userId)
                              }}>
                        Добавить</button>}
            </div>
        </div>)
}

export default User;