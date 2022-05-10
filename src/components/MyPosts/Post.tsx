import React from "react";
import './MyPosts.css';
import '../../assets/Avatar.css'

type PropsType = {
    name: string
    message: string
    likeCounter: number
}

const Post: React.FC<PropsType> = (props) => {
    const like = String.fromCharCode(9825)
    return <div className='post'>
        <div className='avatar postAvatar'/>
        <div className='postName'>{props.name}</div>
        <div className='postMessage'>{props.message}</div>
        <div className='postLike'>{props.likeCounter} {like}</div>
    </div>
};

export default Post;

