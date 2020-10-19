import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, useCallback } from 'react-redux';
import { getCompanyUser, deleteCompanyUser, updateCompanyUser, clearCompanyUserInfo } from 'store/modules/userStore';
import { useHistory } from "react-router";
import UserInfo from '../UserInfo'


// 컨테이너 정의
const UserInfoContainer = ({match}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const result = useSelector((state) => state.userStore.status);
    const userInfo = useSelector((state) => state.userStore.userInfo);
    const stateCheck = useSelector(state => state);

    // state 정의
    const [userForm, setUserForm] = useState(null);

    // life cycle
    useEffect(() => {
        let id = match.params.id;
        dispatch(getCompanyUser(match.params.id));

        // // clear
        // return () => {
        //     // dispatch(clearCompanyUserInfo());
        // }
    }, []) // page loading 

    const onCancel = () => {

        alert("cancel")
        // state clear
        // this.props.history.push("/users");
        history.push({
                pathname:  "/users"
        });
    }

    const onDelete = () => {
        if(window.confirm('Do you want to delete the user?')){
            dispatch(deleteCompanyUser(match.params.id));

            if(result === "user/UPDATE_COMPANY_USER_SUCCESS"){
                alert("check")
            }
            // history.push({
            //     pathname:  "/users"
            // });    

        }
    }

    const onSubmit = (e, user) => {
        e.preventDefault();
        dispatch(updateCompanyUser(user));
        // history.push({
        //     pathname:  "/users"
        // });
    }


    // render
    return (
        <>
            {userInfo && <UserInfo userInfo={userInfo} onSubmit={onSubmit} onDelete={onDelete} onCancel={onCancel} />}
        </>
    )
}

export default UserInfoContainer;