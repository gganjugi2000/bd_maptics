import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, useCallback } from 'react-redux';
import { getAdvertiser, deleteAdvertiser, updateAdvertiser, clearAdvertiserInfo } from 'store/modules/advertiserStore';
import { useHistory } from "react-router";
import AdvertiserInfo from './AdvertiserInfo';
import Popup from '../../../components/PopupComponent';

// 컨테이너 정의
const AdvertiserInfoContainer = ({
        match,
        popupClose,
        infoId
    }) => {

    const dispatch = useDispatch();
    const result = useSelector((state) => state.advertiserStore.status);
    const advertiserInfo = useSelector((state) => state.advertiserStore.advertiserInfo);
    const stateCheck = useSelector(state => state);

    // life cycle
    useEffect(() => {
        dispatch(getAdvertiser(infoId));
    }, []) // page loading 

    const onCancel = (e) => {
        e.preventDefault();
        dispatch(clearAdvertiserInfo());
        popupClose();
    }

    const onDelete = () => {
        if(window.confirm('아이디 [ ' + infoId + ' ] 광고주를 삭제하시겠습니까?')){
            dispatch(deleteAdvertiser(infoId));
            popupClose(); 
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
            <Popup id="detailPopup" title="광고주 상세정보" close={onCancel}>
                {advertiserInfo && <AdvertiserInfo advertiserInfo={advertiserInfo} onSubmit={onSubmit} onDelete={onDelete} onCancel={onCancel} />}
            </Popup>
        </>
    )
}

export default AdvertiserInfoContainer;