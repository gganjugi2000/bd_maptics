import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createAdvertiser } from 'store/modules/advertiserStore';
import { useHistory } from "react-router";
import AdvertiserForm from './AdvertiserForm';


// 컨테이너 정의
const AdvertiserFormContainer = ({
        popupClose
    }) => {

    const dispatch = useDispatch()
    const history = useHistory();
    // state 정의

    // life cycle
    useEffect(() => {

    }, []) // page loading 

    const onCancel = () => {
        // state clear
        // this.props.history.push("/users");
        popupClose();
        history.push({
            pathname:  "/advertiser"
        });
    }

    const onSubmit = (e, advertiser) => {
        e.preventDefault();
        console.log("onSubmit advertiser ==========================================================")
        console.log(advertiser)
        console.log("----------------------------------------------------------------")
        let createAction = dispatch(createAdvertiser(advertiser));
        console.log("createAction = " + createAction);
        console.log(createAction)
        popupClose();
    }

    // render
    return (
        <AdvertiserForm onSubmit={onSubmit} onCancel={onCancel}  />
    )
}

export default AdvertiserFormContainer;