import React from 'react';

import ContentsTitle from '../../components/TitleComponent/ContentsTitle/ContentsTitle';
import CampaignListContainer from './CampaignListContainer/CampaignListContainer';


// 컴포넌트 정의
const CampaignLayout = () => {

    // render
    return (
        <>
            <ContentsTitle 
                title="캠페인 관리"
            />
            <CampaignListContainer />
        </>
    )
}

export default CampaignLayout;