import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createCompanyUser } from 'store/modules/userStore';
import { useHistory } from "react-router";
import UserForm from '../UserForm'


// 컨테이너 정의
const UserFormContainer = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    // state 정의
    const [userForm, setUserForm] = useState(null);

    // life cycle
    useEffect(() => {

    }, []) // page loading 

    const setUserFormValue = (user) => {
        console.log("setUserFormValue ========================= ")
        console.log(user);
        console.log("------------------------------")
        setUserForm(user);
    }

    const onCancel = () => {
        // state clear
        history.push({
            pathname:  "/users"
        });
    }

    const onSubmit = (e, user) => {
        console.log("onSubmit ========================= ")
        console.log(user);
        console.log("------------------------------")
        e.preventDefault();
        dispatch(createCompanyUser(user));
        history.push({
            pathname:  "/users"
        });
    }

    // render
    return (
        <UserForm onSubmit={onSubmit} onCancel={onCancel} setUserForm={setUserFormValue} />
    )
}

export default UserFormContainer;