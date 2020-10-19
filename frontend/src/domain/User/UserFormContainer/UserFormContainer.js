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
        setUserForm(user);
    }

    const onCancel = () => {
        // state clear
        // this.props.history.push("/users");
        history.push({
            pathname:  "/users"
        });
    }

    const onSubmit = (e, user) => {
        e.preventDefault();
        let createAction = dispatch(createCompanyUser(user));
        console.log("createAction = " + createAction);
        console.log(createAction)
        // this.props.history.push("/users");
        // history.push({
        //     pathname:  "/users"
        // });
    }

    // render
    return (
        <UserForm onSubmit={onSubmit} onCancel={onCancel} setUserForm={setUserFormValue} />
    )
}

export default UserFormContainer;