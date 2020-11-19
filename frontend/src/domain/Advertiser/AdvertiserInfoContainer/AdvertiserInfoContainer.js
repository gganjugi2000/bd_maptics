import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, useCallback } from 'react-redux';
import { getAdvertiser, deleteAdvertiser, updateAdvertiser, clearAdvertiserInfo } from 'store/modules/advertiserStore';
import { useHistory } from "react-router";
import AdvertiserInfo from './AdvertiserInfo';


// 컨테이너 정의
const AdvertiserInfoContainer = ({
        match,
        popupClose,
        infoId
    }) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const result = useSelector((state) => state.advertiserStore.status);
    const advertiserInfo = useSelector((state) => state.advertiserStore.advertiserInfo);
    const stateCheck = useSelector(state => state);

    // life cycle
    useEffect(() => {
        console.log("advertiserInfo ================= ")
        console.log(match)
        console.log(infoId)
        dispatch(getAdvertiser(infoId));

        // // clear
        // return () => {
        //     // dispatch(clearAdvertiserInfo());
        // }
    }, []) // page loading 

    const onCancel = () => {
        popupClose();
        // history.push({
        //     pathname:  "/advertiser"
        // });
    }

    const onDelete = () => {
        if(window.confirm('아이디 [ ' + infoId + ' ] 광고주를 삭제하시겠습니까?')){
            dispatch(deleteAdvertiser(infoId));

            popupClose();
            if(result === "advertiser/UPDATE_ADVERTISER_SUCCESS"){
                alert("result check");
            }
            // history.push({
            //     pathname:  "/users"
            // });    
        }
    }

    const onSubmit = (e, advertiser) => {
        e.preventDefault();
        dispatch(updateAdvertiser(advertiser));
        popupClose();
    }

    // render
    return (
        <>
            {advertiserInfo && <AdvertiserInfo advertiserInfo={advertiserInfo} onSubmit={onSubmit} onDelete={onDelete} onCancel={onCancel} />}
        </>
    )
}

export default AdvertiserInfoContainer;