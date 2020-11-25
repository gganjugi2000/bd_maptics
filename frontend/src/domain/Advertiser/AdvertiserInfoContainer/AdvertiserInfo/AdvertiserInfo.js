import React, { useState, useRef, useEffect } from 'react';
import styles from './AdvertiserInfo.module.css';
import classNames from 'classnames/bind';
import Button from '../../../../components/ButtonComponent';
import InputText from '../../../../components/InputTypeComponent/InputTextComponent/InputText';
import InputTextArea from '../../../../components/InputTypeComponent/InputTextAreaComponent/InputTextArea';
import InputSelect from '../../../../components/InputTypeComponent/InputSelectComponent/InputSelect';
import ImageDropZone from '../../../../components/ImageDropZoneComponent/ImageDropZone';

import {
    isEmpty,
    isEquals, 
    validEmail,
    validEmailProvider,
    validPhoneFirst,
    validPhoneMiddle,
    validPhoneEnd
} from 'utiles/validation/common';
import {
    validAdvertiserName,
    validAdvertiserMngName
} from 'utiles/validation/validateAdvertiser';

const cx = classNames.bind(styles);

// TO-DO : email provider list db 관리?
const emailProviderOptions = [
    { value: 'sk.com', label: 'sk.com' },
    { value: 'daum.net', label: 'daum.net' },
    { value: 'naver.com', label: 'naver.com' }
 ];

 const phoneFirstOptions = [
    { value: '010', label: '010' },
    { value: '011', label: '011' },
    { value: '017', label: '017' },
    { value: '018', label: '018' }
 ];


// 컴포넌트 정의
const AdvertiserInfo = ({ advertiserInfo, onSubmit, onDelete, onCancel }) => {
    const [advertiser, setAdvertiser] = useState({
        "advts_id" : "",
        "advts_nm" : "",
        "advts_mng_nm" : "",
        "advts_img" : "",
        "email_addr" : "",
        "email_addr_provider" : "",
        "phone_no_first" : "",
        "phone_no_middle" : "",
        "phone_no_end" : "",
        "descp" : ""
    });
    const [advertiserCaution, setAdvertiserCaution] = useState({
        "advts_id" : "",
        "advts_nm" : "",
        "advts_mng_nm" : "",
        "advts_img" : "",
        "email_addr" : "",
        "email_addr_provider" : "",
        "phone_no_first" : "",
        "phone_no_middle" : "",
        "phone_no_end" : "",
    });
    const [advertiserValid, setAdvertiserValid] = useState({
        "advts_id" : false,
        "advts_nm" : false,
        "advts_mng_nm" : false,
        "advts_img" : false,
        "email_addr" : false,
        "email_addr_provider" : false,
        "phone_no_first" : false,
        "phone_no_middle" : false,
        "phone_no_end" : false,
    });
    const [advtsImgFile, setAdvtsImgFile] = useState(null);
    const [helpMsg, setHelpMsg] = useState("");
    const advtsImgRef = useRef();

    useEffect(() => {
        return function clean() {
            setAdvertiser(null);
            setAdvertiserCaution(null);
            setAdvertiserValid(null);
        }
    }, []);

    useEffect(() => {
        if(!isEmpty(advertiserInfo)){
            let emailAddr = "";
            let emailAddrProvider = "";
            if(!isEmpty(advertiserInfo.email_addr)){
                let splitEmail = advertiserInfo.email_addr.split('@');
                if(splitEmail.length === 2) {
                    emailAddr = splitEmail[0];
                    emailAddrProvider = splitEmail[1];
                }
            }

            let phoneNoFirst = "";
            let phoneNoMiddle = "";
            let phoneNoEnd = "";
            if(!isEmpty(advertiserInfo.phone_no)){
                let splitPhoneNo = advertiserInfo.phone_no.split('-');
                if(splitPhoneNo.length === 3) {
                    phoneNoFirst = splitPhoneNo[0];
                    phoneNoMiddle = splitPhoneNo[1];
                    phoneNoEnd = splitPhoneNo[2];
                }
            }
            console.log("Info ============================ ")
            console.log(advertiserInfo.phone_no)
            console.log(phoneNoFirst)
            console.log(phoneNoMiddle)
            console.log(phoneNoEnd)
            console.log(advertiserInfo.advts_img)
            console.log("----------------------------------")
            
            setAdvertiser({
                ...advertiser
                , advts_id: advertiserInfo.advts_id
                , advts_nm: advertiserInfo.advts_nm
                , advts_mng_nm: advertiserInfo.advts_mng_nm
                , advts_img: advertiserInfo.advts_img
                , email_addr: emailAddr
                , email_addr_provider: emailAddrProvider
                , phone_no_first: (phoneNoFirst !== "" ? { value: phoneNoFirst, label: phoneNoFirst } : null)
                , phone_no_middle: phoneNoMiddle
                , phone_no_end: phoneNoEnd
                , descp: advertiserInfo.descp
            });
        }
    }, [advertiserInfo]) // page loading 


    const setImageData = (fileData) => {
        setAdvertiser({
            ...advertiser
            , advts_img: fileData
        });
    }
    
    const setImageFile = (file) => {
        setAdvtsImgFile(file);
    }

    const setAdvertiserNameValue = (e, value) => {
        // if(!validAdvertiserName(value)){
        //     setAdvertiserCaution({
        //         ...advertiserCaution
        //         , advts_nm: "한글/영문,2자 이상 입력 가능합니다."
        //     });
        // } else {
        //     setAdvertiserCaution({
        //         ...advertiserCaution
        //         , advts_nm: ""
        //     });
        // }

        setAdvertiser({
            ...advertiser
            , advts_nm: value
        });
    }

    const setAdvertiserMngNameValue = (e, value) => {
        // if(!validAdvertiserMngName(value)){
        //     setAdvertiserCaution({
        //         ...advertiserCaution
        //         , advts_mng_nm: "한글/영문,2자 이상 입력 가능합니다."
        //     });
        // } else {
        //     setAdvertiserCaution({
        //         ...advertiserCaution
        //         , advts_mng_nm: ""
        //     });
        // }

        setAdvertiser({
            ...advertiser
            , advts_mng_nm: value
        });
    }

    const setEmailValue = (e, value) => {
        // if(!validEmail(value)){
        //     setAdvertiserCaution({
        //         ...advertiserCaution
        //         , email_addr: "이메일 형식이 올바르지 않습니다."
        //     });
        // } else {
        //     setAdvertiserCaution({
        //         ...advertiserCaution
        //         , email_addr: ""
        //     });
        // }

        setAdvertiser({
            ...advertiser
            , email_addr: value
        });
    }

    const setEmailProviderValue = (e, value) => {
        // console.log("EmailProvider === ");
        // console.log(obj);
        // if(!isEmpty(obj) && (obj.hasOwnProperty("value") ? !validEmailProvider(obj.value) : !validEmailProvider(obj))){
        //     setAdvertiserCaution({
        //         ...advertiserCaution
        //         , email_addr_provider: "이메일 형식이 올바르지 않습니다."
        //     });
        // } else {
        //     setAdvertiserCaution({
        //         ...advertiserCaution
        //         , email_addr_provider: ""
        //     });
        // }

        setAdvertiser({
            ...advertiser
            , email_addr_provider: value
        });
    }

    const setPhoneNoFirstValue = (obj) => {
        // if(!isEmpty(obj) && !validPhoneFirst(obj.value)){
        //     setAdvertiserCaution({
        //         ...advertiserCaution
        //         , phone_no_first: "숫자,3~4자 입력 가능합니다."
        //     });
        // } else {
        //     setAdvertiserCaution({
        //         ...advertiserCaution
        //         , phone_no_first: ""
        //     });
        // }

        setAdvertiser({
            ...advertiser
            , phone_no_first: obj
        });
    }

    const setPhoneNoMiddleValue = (e, value) => {
        // if(!validPhoneMiddle(value)){
        //     setAdvertiserCaution({
        //         ...advertiserCaution
        //         , phone_no_middle: "숫자,3~4자 입력 가능합니다."
        //     });
        // } else {
        //     setAdvertiserCaution({
        //         ...advertiserCaution
        //         , phone_no_middle: ""
        //     });
        // }

        setAdvertiser({
            ...advertiser
            , phone_no_middle: value
        });
    }

    const setPhoneNoEndValue = (e, value) => {
        // if(!validPhoneEnd(value)){
        //     setAdvertiserCaution({
        //         ...advertiserCaution
        //         , phone_no_end: "숫자,4자 입력 가능합니다."
        //     });
        // } else {
        //     setAdvertiserCaution({
        //         ...advertiserCaution
        //         , phone_no_end: ""
        //     });
        // }

        setAdvertiser({
            ...advertiser
            , phone_no_end: value
        });
    }

    const setDescpValue = (e, value) => {
        setAdvertiser({
            ...advertiser
            , descp: value
        });
    }

    const openFileSelectPopup = (e) => {
        e.preventDefault();
        advtsImgRef.current.filePopupOpen();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let advtsNmValid, advtsMngNmValid, advtsImgValid, emailAddrValid, emailAddrProviderValid, phoneNoFirstValid, phoneNoMiddleValid, phoneNoEndValid = false;
        let advtsNmMsg, advtsMngNmMsg, advtsImgMsg, emailAddrMsg, emailAddrProviderMsg, phoneNoFirstMsg, phoneNoMiddleMsg, phoneNoEndMsg = "";
        
        if(!isEmpty(advertiser.advts_nm) && validAdvertiserName(advertiser.advts_nm)){
            advtsNmValid = true;
        } else {
            advtsNmMsg = "한글/영문,2자 이상 입력 해야 합니다.";
        }
        if(!isEmpty(advertiser.advts_mng_nm) && validAdvertiserMngName(advertiser.advts_mng_nm)){
            advtsMngNmValid = true;
        } else {
            advtsMngNmMsg = "한글/영문,2자 이상 입력 해야 합니다.";
        }
        if(!isEmpty(advertiser.advts_img)){
            advtsImgValid = true;
        } else {
            advtsImgMsg = "이미지는 필수로 등록해야 합니다.";
        }
        if(!isEmpty(advertiser.email_addr) && validEmail(advertiser.email_addr)){
            emailAddrValid = true;
        } else {
            emailAddrMsg = "이메일 형식에 맞게 입력 해야 합니다.";
        }
        if(!isEmpty(advertiser.email_addr_provider) && validEmailProvider(advertiser.email_addr_provider)){
            emailAddrProviderValid = true;
        } else {
            emailAddrProviderMsg = "이메일 형식에 맞게 입력 해야 합니다.2";
        }
        if(!isEmpty(advertiser.phone_no_first) && validPhoneFirst(advertiser.phone_no_first.value)){
            phoneNoFirstValid = true;
        } else {
            phoneNoFirstMsg = "전화 번호 형식에 맞게 입력 해야 합니다.1";
        }
        if(!isEmpty(advertiser.phone_no_middle) && validPhoneMiddle(advertiser.phone_no_middle)){
            phoneNoMiddleValid = true;
        } else {
            phoneNoMiddleMsg = "전화 번호 형식에 맞게 입력 해야 합니다.2";
        }
        if(!isEmpty(advertiser.phone_no_end) && validPhoneEnd(advertiser.phone_no_end)){
            phoneNoEndValid = true;
        } else {
            phoneNoEndMsg = "전화 번호 형식에 맞게 입력 해야 합니다.3";
        }
        
        setAdvertiserValid({
            ...advertiserValid
            , advts_nm: advtsNmValid
            , advts_mng_nm: advtsMngNmValid
            , advts_img: advtsImgValid
            , email_addr: emailAddrValid
            , email_addr_provider: emailAddrProviderValid
            , phone_no_first: phoneNoFirstValid
            , phone_no_middle: phoneNoMiddleValid
            , phone_no_end: phoneNoEndValid
        });
        setAdvertiserCaution({
            ...advertiserCaution
            , advts_nm : advtsNmMsg
            , advts_mng_nm : advtsMngNmMsg
            , advts_img : advtsImgMsg
            , email_addr : emailAddrMsg
            , email_addr_provider: emailAddrProviderMsg
            , phone_no_first : phoneNoFirstMsg
            , phone_no_middle : phoneNoMiddleMsg
            , phone_no_end : phoneNoEndMsg
        });

        console.log("valid ==========================================================")
        console.log(advtsNmValid)
        console.log(advtsMngNmValid)
        console.log(advtsImgValid)
        console.log(emailAddrValid)
        console.log(emailAddrProviderValid)
        console.log(phoneNoFirstValid)
        console.log(phoneNoMiddleValid)
        console.log(phoneNoEndValid)
        console.log("----------------------------------------------------------------")
        console.log("valid msg ==========================================================")
        console.log(advtsNmMsg)
        console.log(advtsMngNmMsg)
        console.log(advtsImgMsg)
        console.log(emailAddrMsg)
        console.log(emailAddrProviderMsg)
        console.log(phoneNoFirstMsg)
        console.log(phoneNoMiddleMsg)
        console.log(phoneNoEndMsg)
        console.log("----------------------------------------------------------------")

        if(!advtsNmValid || !advtsMngNmValid || !advtsImgValid 
            || !emailAddrValid || !emailAddrProviderValid
            || !phoneNoFirstValid || !phoneNoMiddleValid || !phoneNoEndValid) {
            alert("입력 항목 오류");
            return;
        }

        const emailAddr = advertiser.email_addr + "@" + advertiser.email_addr_provider;
        const phoneNo = advertiser.phone_no_first.value + "-" + advertiser.phone_no_middle + "-" + advertiser.phone_no_end;
        let formData = new FormData();
        formData.append("advts_id", advertiser.advts_id);
        formData.append("advts_nm", advertiser.advts_nm);
        formData.append("advts_mng_nm", advertiser.advts_mng_nm);
        formData.append("advts_img_file", advtsImgFile);
        formData.append("email_addr", emailAddr);
        formData.append("phone_no", phoneNo);
        formData.append("descp", advertiser.descp);

        onSubmit(e, formData);
    };

    return (
        <>
            <span className={cx("add_title")}>기본 정보 작성 <span color='red'>{helpMsg}</span></span>
            <p className={cx("board_notice")}><span className={cx("required")}>V</span>표시는 필수 입력 항목입니다.</p>
            <div className={cx("board_write")}>
                <table>
                    <tbody>
                    <tr>
                        <th scope="row"><label htmlFor="PTjoin_name" className={cx("label")}><em className={cx("required")}>V</em>광고주이미지</label></th>
                        <td>
                            <span className={cx("photo")} style={{width: "180px",height: "100px"}}>
                                <ImageDropZone
                                    imageData={advertiser.advts_img}
                                    handleImageData={setImageData}
                                    handleImageFile={setImageFile}
                                    ref={advtsImgRef}
                                />
                            </span>
                            <Button
                                type="btn_small"
                                onClick={(e) => {
                                    openFileSelectPopup(e);
                                }}
                                >
                                이미지업로드
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label htmlFor="PTjoin_name" className={cx("label")}><em className={cx("required")}>V</em>광고주 아이디</label></th>
                        <td>
                            <InputText 
                                id="advts_id"
                                size="27"
                                placeholder=""
                                value={advertiser.advts_id}
                                caution={advertiserCaution.advts_id}
                                disabled
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label htmlFor="PTjoin_id" className={cx("label")}><em className={cx("required")}>V</em>광고주 명</label></th>
                        <td>
                            <InputText 
                                id="advts_nm"
                                size="27"
                                placeholder=""
                                value={advertiser.advts_nm}
                                caution={advertiserCaution.advts_nm}
                                onChange={(e) => {
                                    setAdvertiserNameValue(e, e.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label htmlFor="PTjoin_pw" className={cx("label")}><em className={cx("required")}>V</em>담당자 명</label></th>
                        <td>
                            <InputText 
                                id="advts_mng_nm"
                                size="27"
                                placeholder=""
                                value={advertiser.advts_mng_nm}
                                caution={advertiserCaution.advts_mng_nm}
                                onChange={(e) => {
                                    setAdvertiserMngNameValue(e, e.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label htmlFor="PTjoin_email" className={cx("label")}><em className={cx("required")}>V</em>이메일</label></th>
                        <td>
                            <InputText 
                                id="email_addr"
                                style={{width: "100px"}}
                                placeholder=""
                                value={advertiser.email_addr}
                                caution={advertiserCaution.email_addr}
                                onChange={(e) => {
                                    setEmailValue(e, e.target.value);
                                }}
                            />
                            <span className={cx("at")}>@</span>
                            <InputText 
                                id="email_addr_provider"
                                style={{width: "100px"}}
                                placeholder="직접입력"
                                value={advertiser.email_addr_provider}
                                caution={advertiserCaution.email_addr_provider}
                                onChange={(e) => {
                                    setEmailProviderValue(e, e.target.value);
                                }}
                            />
                            {/* <InputSelect
                                type="select"
                                id="email_addr_provider"
                                placeholder="직접입력"
                                style={{width: "170px"}}
                                value={advertiser.email_addr_provider}
                                caution={advertiserCaution.email_addr_provider}
                                options={emailProviderOptions}
                                onChange={(value) => {
                                    setEmailProviderValue(value);
                                }}
                            /> */}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label htmlFor="PTjoin_tel" className={cx("label")}><em className={cx("required")}>V</em>연락처</label></th>
                        <td>
                            <span className={cx("inselect")}>
                                <InputSelect
                                    type="select"
                                    id="phone_no_first"
                                    placeholder="Phone"
                                    value={advertiser.phone_no_first}
                                    caution={advertiserCaution.phone_no_first}
                                    options={phoneFirstOptions}
                                    onChange={(value) => {
                                        setPhoneNoFirstValue(value);
                                    }}
                                />
                            </span>
                            <span className={cx("dash")}>-</span>
                            <InputText 
                                id="phone_no_middle"
                                style={{width: "50px"}}
                                placeholder=""
                                size="4"
                                maxlength="4"
                                value={advertiser.phone_no_middle}
                                caution={advertiserCaution.phone_no_middle}
                                onChange={(e) => {
                                    setPhoneNoMiddleValue(e, e.target.value);
                                }}
                            />
                            <span className={cx("dash")} >-</span>
                            <InputText 
                                id="phone_no_end"
                                style={{width: "50px"}}
                                placeholder=""
                                size="4"
                                maxlength="4"
                                value={advertiser.phone_no_end}
                                caution={advertiserCaution.phone_no_end}
                                onChange={(e) => {
                                    setPhoneNoEndValue(e, e.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label htmlFor="PTjoin_attach" className={cx("label")}><em className={cx("required")}>V</em>비고</label></th>
                        <td>
                            <InputTextArea
                                id="descp"
                                style={{width:"280px",height: "100px"}}
                                rows={10}
                                cols={70}
                                maxLength={300}
                                value={advertiser.descp}
                                caution={advertiserCaution.descp}
                                onChange={(e) => {
                                    setDescpValue(e, e.target.value);
                                }}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={cx("btn_set")}>
                <Button
                    type="btn_gray"
                    onClick={(e) => {
                        onCancel(e);
                    }}
                    >
                    취소
                </Button>
                <Button
                    type="btn_black"
                    onClick={(e) => {
                        onDelete(e);
                    }}
                    >
                    삭제
                </Button>
                <Button
                    type="btn_black"
                    onClick={(e) => {
                        handleSubmit(e);
                    }}
                    >
                    수정
                </Button>
            </div>
        </>
    )
}

export default AdvertiserInfo;