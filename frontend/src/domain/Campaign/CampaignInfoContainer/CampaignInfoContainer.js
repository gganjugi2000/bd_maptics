import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, useCallback } from 'react-redux';
import { getCampaign, deleteCampaign, updateCampaign, clearCampaignInfo, searchAdvertiser } from 'store/modules/campaignStore';
import { useHistory } from "react-router";
import CampaignInfo from './CampaignInfo';
import ContentsTitle from '../../../components/TitleComponent/ContentsTitle/ContentsTitle';
import AdvertiserSearch from '../../Advertiser/AdvertiserSearchContainer/AdvertiserSearchContainer';
import Popup from '../../../components/PopupComponent';

// 컨테이너 정의
const CampaignInfoContainer = ({
        match
    }) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const advertiserInfo = useSelector((state) => state.campaignStore.advertiserInfo);
    const {campaignInfo, campaignAcknlg} = useSelector((state) => state.campaignStore);
    
    // state 정의
    const [openAdvtsSearch, setOpenAdvtsSearch] = useState(false);

    // life cycle
    useEffect(() => {
        dispatch(getCampaign(match.params.id));
    }, []) // page loading 

    const handleAdvtsSearchPopupOpen = (e) => {
        setOpenAdvtsSearch(true);
    }

    const handleAdvtsSearchPopupClose = (e) => {
        setOpenAdvtsSearch(false);
    }

    const onCancel = (e) => {
        e.preventDefault();
        dispatch(clearCampaignInfo());
        history.push({
            pathname:  "/campaign"
        });
    }

    const onDelete = () => {
        if(window.confirm('아이디 [ ' + match.params.id + ' ] 캠페인을 삭제하시겠습니까?')){
            dispatch(deleteCampaign(match.params.id));
            history.push({
                pathname:  "/campaign"
            });
        }
    }

    const onSubmit = (e, campaign) => {
        e.preventDefault();
        dispatch(updateCampaign(campaign));
        history.push({
            pathname:  "/campaign"
        });
    }

    const handleSearchAdvertiser = (value) => {
        dispatch(searchAdvertiser(value));
        setOpenAdvtsSearch(false);
    }

    // render
    return (
        <>
            <ContentsTitle 
                title="캠페인 상세"
            />
            {campaignInfo && <CampaignInfo advertiserInfo={advertiserInfo} campaignInfo={campaignInfo} campaignAcknlg={campaignAcknlg} onSubmit={onSubmit} onDelete={onDelete} onCancel={onCancel} handleAdvtsSearchPopupOpen={handleAdvtsSearchPopupOpen} />}
            {openAdvtsSearch ? 
                <Popup id="detailPopup" title="광고주 검색" close={handleAdvtsSearchPopupClose}>
                    <AdvertiserSearch popupClose={handleAdvtsSearchPopupClose} handleSearchAdvertiserCallback={handleSearchAdvertiser} />
                </Popup>
             : null}
        </>
    )
}

export default CampaignInfoContainer;