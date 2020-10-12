import React from 'react';
import { login, setAuth, getUserInfo } from "../util/common";

function AxiosTest(props) {
    const loginHandler = () => {
        login({email: 'mo0562@bluedigm.com', password: '12qwaszx!@'})
            .then(res => {
                const result =  res.data;
                if (result.success) {
                    console.log('result.token', result.token);
                    setAuth(result.token);
                }
            })
    };

    const checkHandler = () => {
        getUserInfo()
            .then(res => {
                console.log(res);
            })
    };

    return (
        <div>
            <button onClick={loginHandler}>login</button>
            <br/>
            <button onClick={checkHandler}>검증</button>
        </div>
    );
}

export default AxiosTest;
