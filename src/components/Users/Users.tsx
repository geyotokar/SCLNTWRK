import React, {useEffect} from 'react';
import './Users.css'
import Paginator from "./Paginator";
import User from "./User";
import {FilterType, requestUsers, follow, unfollow} from "../../REDUX/users-reducer";
import UsersSearchForm from "./UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers,
    getUsersFilter
} from "../../REDUX/users-selectors";
import Preloader from "../../assets/Preloader";
import {useNavigate, useSearchParams} from "react-router-dom";

type QueryParamsType = { term?: string; page?: string; friend?: string }

export const Users: React.FC = () => {
    const isFetching = useSelector(getIsFetching)
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        let actualPage = currentPage
        let actualFilter = filter
        if (!!searchParams.get('page')) {
            actualPage = Number(searchParams.get('page'))
        }
        if (!!searchParams.get('term')) {
            actualFilter = {...actualFilter, term: searchParams.get('term') as string}
        }
        switch(searchParams.get('friend')) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    },[])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (currentPage !== 1) query.page = String(currentPage)
        if (filter.friend !== null) query.friend = String(filter.friend)

        navigate('/users', {})
        setSearchParams(query)
        dispatch(requestUsers(currentPage, pageSize, filter))
    },[filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const followCB = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollowCB = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return <div>
        {isFetching ? <Preloader/> : null}
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
        </div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount}
                   pageSize={pageSize}/>
        <div className='usersContainer'> {users.map(u =>
            <User user={u}
                  key={u.id}
                  followingInProgress={followingInProgress}
                  follow={followCB}
                  unfollow={unfollowCB}
                  />)}
        </div>
    </div>
}