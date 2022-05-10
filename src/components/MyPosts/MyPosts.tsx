import './MyPosts.css'
import React from 'react'
import Post from './Post'
import AddPostForm from './AddPostForm'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../REDUX/redux-store'

const MyPosts: React.FC = React.memo(() => {
    const posts = useSelector((state:AppStateType) => state.profilePage.posts)
    let postsElements =
        [...posts]
            .reverse()
            .map(p => <Post key={p.id} name={p.name} message={p.message} likeCounter={p.likeCounter}/>)
    return <div className='postsContainer'>
        <div>Что нового?</div>
        <AddPostForm />
        МОИ НОВОСТИ
        {postsElements}
    </div>
})

export default MyPosts;