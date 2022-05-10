import React, {useEffect} from 'react';
import './App.css';
import Nav from './components/Nav/Nav'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import {Provider, useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./REDUX/app-reducer";
import Preloader from "./assets/Preloader";
import store, {AppStateType} from "./REDUX/redux-store";
import MyPosts from "./components/MyPosts/MyPosts";
import {Users} from "./components/Users/Users";
const Login = React.lazy(() => import('./components/Login/Login'))
const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));

const App: React.FC = () => {
    const initialized = useSelector((state: AppStateType) => state.app.initialized)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initialized) {
        return <Preloader/>
    }
    return (
        <div className='app-wrapper'>
            <Header/>
            <Nav/>
            <div className='app-wrapper-content'>
                <React.Suspense fallback={<Preloader/>}>
                    <Routes>
                        <Route path='/' element={<Login/>}/>
                        <Route path='/profile/*' element={<Profile/>}/>
                        <Route path='/login' element={<Login />}/>
                        <Route path='/news/' element={<MyPosts/>}/>
                        <Route path='/dialogs/*' element={<Dialogs/>}/>
                        <Route path='/users/' element={<Users/>}/>
                    </Routes>
                </React.Suspense>
            </div>
        </div>)
}

const SamuraiJSApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp;