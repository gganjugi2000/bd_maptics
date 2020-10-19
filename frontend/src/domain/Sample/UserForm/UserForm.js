import React, { useState } from 'react';
import styles from './UserForm.module.css';
import classNames from 'classnames/bind';

import {
    isEmpty
} from 'utiles/validation/common';
import {
    validUserID,
    validUserEmail
} from 'utiles/validation/validateUser';


const cx = classNames.bind(styles);

// 컴포넌트 정의
const UserForm = ({onSubmit, onCancel, setUserForm}) => {
    const [helpMsg, setHelpMsg] = useState("");
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userFile, setUserFile] = useState(null);
    const [imgUrl, setImgUrl] = useState("");

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
            // alert("validation test false \n email pattern check");
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

        let user = {"user_id": userId, "user_name": userName, "user_email": userEmail, "user_file": userFile};
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
            <p>
                <img src={imgUrl} alt="img test" width="100" height="50" style={imgUrl !== "" ?  {display: 'inline-block'} : {display: 'none'}}/>
            </p>
            <p>
                <button type="submit">저장</button>
                <button onClick={(e) => {
                    onCancel();
                }}>취소</button>
            </p>
        </form>
    )
}

export default UserForm;