import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createAdvertiser } from 'store/modules/advertiserStore';
import { useHistory } from "react-router";
import AdvertiserForm from './AdvertiserForm';
import Popup from '../../../components/PopupComponent';


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
        if(window.confirm('작성 중인 정보가 삭제됩니다.\n창을 닫으시겠습니까?')){
            popupClose(); 
        }
    }

    const onSubmit = (e, advertiser) => {
        e.preventDefault();
        dispatch(createAdvertiser(advertiser));
        
        popupClose();
    }

    // render
    return (
        <>
            <Popup id="createPopup" title="광고주 등록" close={onCancel}>
                <AdvertiserForm onSubmit={onSubmit} onCancel={onCancel}  />
            </Popup>
        </>
    )
}

export default AdvertiserFormContainer;