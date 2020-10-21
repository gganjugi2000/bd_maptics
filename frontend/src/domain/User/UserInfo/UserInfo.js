import React, { useState, useEffect } from 'react';
import styles from './UserInfo.module.css';
import classNames from 'classnames/bind';
import InputDatePicker from '../../../components/InputDatePickerComponent/InputDatePicker';

import {
    isEmpty
} from 'utiles/validation/common';
import {
    validUserID,
    validUserEmail
} from 'utiles/validation/validateUser';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const UserInfo = ({userInfo, onSubmit, onCancel, onDelete}) => {
    const [helpMsg, setHelpMsg] = useState("");
    const [id, setId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userFile, setUserFile] = useState(null);
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        if(userInfo && userInfo.length > 0){
            setId(userInfo[0].id);
            setUserId(userInfo[0].user_id);
            setUserName(userInfo[0].user_name);
            setUserEmail(userInfo[0].user_email);
        }
    }, [userInfo]) // page loading 

    const setUserIdValue = (e, value) => {
        if(isEmpty(value)){
            alert("Empty");
            return;
        }

        if(!validUserID(value)){
            alert("validation test false \n user id only number check");
            setHelpMsg("validation test false \n user id only number check");
            return;
        }

        setHelpMsg("");
        setUserId(value);
    }

    const setUserNameValue = (e, value) => {
        if(isEmpty(value)){
            alert("Empty");
            return;
        }

        setHelpMsg("");
        setUserName(value);
    }

    const setUserEmailValue = (e, value) => {
        if(!validUserEmail(value)){
            setHelpMsg("validation test false \n email pattern check");
        } else {
            setHelpMsg("");
        }

        setUserEmail(value);
    }

    const setUserFileValue = (e) => {
        if(isEmpty(e))
            return;
        
        let reader = new FileReader();
        reader.onload = function (e) {
            setImgUrl(e.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    
        setHelpMsg("");
        setUserFile(e.target.files[0]);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        onDelete(e);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isEmpty(userId) || !validUserID(userId)){
            alert("check user id");
            setHelpMsg("user id only number check");
            return;
        }

        if(isEmpty(userEmail) || !validUserEmail(userEmail)){
            alert("check user email");
            setHelpMsg("user email only number check");
            return;
        }


        let user = {"id": id, "user_id": userId, "user_name": userName, "user_email": userEmail, "user_file": userFile};
        const formData = new FormData();
        formData.append("user_id", userId);
        formData.append("user_name", userName);
        formData.append("user_email", userEmail);
        // formData.append("file", userFile);

        // onSubmit(e, formData);
        onSubmit(e, user);
    };

    // render
    return (
        <>
            <p>
                <button type="button" onClick={(e) => {
                    handleSubmit(e);
                }}>수정</button>
                <button type="button" onClick={(e) => {
                    handleDelete(e);
                }}>삭제</button>
                <button type="button" onClick={(e) => {
                    onCancel(e);
                }}>취소</button>
            </p>
            <form
                onSubmit= {(e) => handleSubmit(e)}
            >
                <p>
                    <label id="helpMsg">{helpMsg}</label>
                </p>
                <p>
                    <input
                        id="userId"
                        size="50"
                        placeholder="User ID"
                        value={userId || ""}
                        onChange={(e) => {
                            setUserIdValue(e, e.target.value);
                        }}
                    />
                </p>
                <p>
                    <input
                        id="userName"
                        size="50"
                        placeholder="User Name"
                        value={userName || ""}
                        onChange={(e) => {
                            setUserNameValue(e, e.target.value);
                        }}
                    />
                </p>
                <p>
                    <input
                        id="email"
                        type="email"
                        size="50"
                        placeholder="Email"
                        value={userEmail || ""}
                        onChange={(e) => {
                            setUserEmailValue(e, e.target.value);
                        }}
                    />
                </p>
                <p>
                    <input
                        id="userFile"
                        type="file"
                        size="50"
                        placeholder="User ID"
                        onChange={(e) => {
                            setUserFileValue(e);
                        }}
                    />
                </p>
                    <InputDatePicker />
                <p>
                    <img src={imgUrl} alt="img test" width="100" height="50" style={imgUrl !== "" ?  {display: 'inline-block'} : {display: 'none'}}/>
                </p>
                
            </form>
        </>
    )
}

export default UserInfo;