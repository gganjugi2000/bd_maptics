import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createCampaign, searchAdvertiser, clearCampaignInfo} from 'store/modules/campaignStore';
import { useHistory } from "react-router";
import CampaignForm from './CampaignForm';
import ContentsTitle from '../../../components/TitleComponent/ContentsTitle/ContentsTitle';
import AdvertiserSearch from '../../Advertiser/AdvertiserSearchContainer/AdvertiserSearchContainer';
import Popup from '../../../components/PopupComponent';

// 컨테이너 정의
const CampaignFormContainer = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const advertiserInfo = useSelector((state) => state.campaignStore.advertiserInfo);
    
    // state 정의
    const [openAdvtsSearch, setOpenAdvtsSearch] = useState(false);

    // life cycle
    useEffect(() => {
        return () => {
            dispatch(clearCampaignInfo());
        }
    }, []) // page loading 

    const handleAdvtsSearchPopupOpen = (e) => {
        setOpenAdvtsSearch(true);
    }

    const handleAdvtsSearchPopupClose = (e) => {
        setOpenAdvtsSearch(false);
    }

    const onCancel = () => {
        // state clear
        if(window.confirm('작성 중인 정보가 삭제됩니다.\n취소 하시겠습니까?')){
            history.push({
                pathname:  "/campaign"
            });
        }
    }

    const onSubmit = (e, campaign) => {
        e.preventDefault();
        dispatch(createCampaign(campaign));
        dispatch(clearCampaignInfo());
    }

    const handleSearchAdvertiser = (value) => {
        dispatch(searchAdvertiser(value));
        setOpenAdvtsSearch(false);
    }
    // render
    return (
        <>
            <ContentsTitle 
                title="캠페인 등록"
            />
            <CampaignForm advertiserInfo={advertiserInfo} onSubmit={onSubmit} onCancel={onCancel} handleAdvtsSearchPopupOpen={handleAdvtsSearchPopupOpen} />  
            {openAdvtsSearch ? 
                <Popup id="detailPopup" title="광고주 검색" close={handleAdvtsSearchPopupClose}>
                    <AdvertiserSearch popupClose={handleAdvtsSearchPopupClose} handleSearchAdvertiserCallback={handleSearchAdvertiser} />
                </Popup>
             : null}
        </>
    )
}

export default CampaignFormContainer;