import React from 'react';

import ContentsTitle from '../../components/TitleComponent/ContentsTitle/ContentsTitle';
import AdvertiserListContainer from './AdvertiserListContainer/AdvertiserListContainer';


// 컴포넌트 정의
const AdvertiserLayout = () => {

    // render
    return (
        <>
            <ContentsTitle 
                title="광고주 관리"
            />
            <AdvertiserListContainer />
        </>
    )
}

export default AdvertiserLayout;