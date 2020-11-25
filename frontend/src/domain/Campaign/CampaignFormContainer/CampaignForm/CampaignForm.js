import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from './CampaignForm.module.css';
import classNames from 'classnames/bind';
import Button from '../../../../components/ButtonComponent';
import InputText from '../../../../components/InputTypeComponent/InputTextComponent/InputText';
import InputRadio from '../../../../components/InputTypeComponent/InputRadioComponent/InputRadio';
import InputCheckBox from '../../../../components/InputTypeComponent/InputCheckBoxComponent/InputCheckBox';
import InputTextArea from '../../../../components/InputTypeComponent/InputTextAreaComponent/InputTextArea';
import InputSelect from '../../../../components/InputTypeComponent/InputSelectComponent/InputSelect';
import ImageDropZone from '../../../../components/ImageDropZoneComponent/ImageDropZone';
import DatePicker from 'react-datepicker';
import {
    changeFormat
} from 'utiles/format/date/changeFormat';
import {
    isEmpty,
    isNumber,
    checkByteOfValue
} from 'utiles/validation/common';
import {
    validCampaignId,
    validCampaignName,
    validCampaignMngName
} from 'utiles/validation/validateCampaign';

const cx = classNames.bind(styles);

const dateAPOptions = [
    { value: 'am', label: '오전' },
    { value: 'pm', label: '오후' }
];

const createDateOption = (gbn) => {
    let dateOption = [];
    let count = 0;
    let i = 0;
    if(gbn === 'hh') {
        count = 13;
        i = 1;
    } else if(gbn === 'mm') {
        count = 60;
        i = 0;
    }
    for(i; i < count; i++) {
        let data = {};
        if(i < 10) {
            data.value = "0" + i;
            data.label = "0" + i;
        } else {
            data.value = "" + i;
            data.label = "" + i;
        }
        dateOption.push(data);
    }
    return dateOption;
}
 
const msgTitleMaxByte = 100; 
const msgSummaryMaxByte = 2500;
 
// 컴포넌트 정의
const CampaignForm = ({ advertiserInfo, onSubmit, onCancel, handleAdvtsSearchPopupOpen }) => {
    const [campaign, setCampaign] = useState({
        "advts_id" : "",
        "cmpgn_title" : "",
        "cmpgn_pps" : "",
        "send_req_cnt" : 0,
        "send_dt_ymd" : null,
        "send_dt_ap" : "",
        "send_dt_hh" : "",
        "send_dt_mm" : "",
        "use_cm" : 'N',
        "send_mode" : "",
        "mgs_title" : "",
        "msg_summary" : "",
        "msg_app_img" : "",
        "sender_no" : "",
        "rct_target" : "",
        "link_ps_url_1" : "",
        "link_ps_yn_1" : false,
        "link_ps_url_2" : "",
        "link_ps_yn_2" : false,
        "link_ps_url_3" : "",
        "link_ps_yn_3" : false,
        "url_upload" : "",
        "url_upload_cv" : false,
        "cp_no_upload" : ""
    });
    const [campaignCaution, setCampaignCaution] = useState({
        "advts_id" : "",
        "cmpgn_title" : "",
        "cmpgn_pps" : "",
        "send_req_cnt" : "",
        "send_dt_ymd" : "",
        "send_dt_ap" : "",
        "send_dt_hh" : "",
        "send_dt_mm" : "",
        "use_cm" : "",
        "send_mode" : "",
        "mgs_title" : "",
        "msg_summary" : "",
        "msg_app_img" : "",
        "sender_no" : "",
        "rct_target" : "",
        "link_ps_url_1" : "",
        "link_ps_yn_1" : "",
        "link_ps_url_2" : "",
        "link_ps_yn_2" : "",
        "link_ps_url_3" : "",
        "link_ps_yn_3" : "",
        "url_upload" : "",
        "cp_no_upload" : ""
    });
    const [campaignValid, setCampaignValid] = useState({
        "advts_id" : false,
        "cmpgn_title" : false,
        "cmpgn_pps" : false,
        "send_req_cnt" : false,
        "send_dt_ymd" : false,
        "send_dt_ap" : false,
        "send_dt_hh" : false,
        "send_dt_mm" : false,
        "use_cm" : false,
        "send_mode" : false,
        "mgs_title" : false,
        "msg_summary" : false,
        "msg_app_img" : false,
        "sender_no" : false,
        "rct_target" : false,
        "link_ps_url_1" : false,
        "link_ps_yn_1" : false,
        "link_ps_url_2" : false,
        "link_ps_yn_2" : false,
        "link_ps_url_3" : false,
        "link_ps_yn_3" : false,
        "url_upload" : false,
        "cp_no_upload" : false,
        "phone_no_end" : false
    });

    const [msgTitleByte, setMsgTitleByte] = useState(0);
    const [msgSummaryByte, setMsgSummaryByte] = useState(0);
    const [msgAppImgFile, setMsgAppImgFile] = useState(null);       // mms/rcs 첨부 이미지
    const [rctTargetFile, setRctTargetFile] = useState(null);       // 수신대상 파일
    const [urlUploadFile, setUrlUploadFile] = useState(null);       // url업로드
    const [cpNoUploadFile, setCpNoUploadFile] = useState(null);     // 쿠폰번호 업로드

    const [helpMsg, setHelpMsg] = useState("");
    const advtsImgRef = useRef();

    // clean
    useEffect(() => {
        return () => {
            setCampaign(null);
            setCampaignCaution(null);
            setCampaignValid(null);
        }
    }, []);

    const setMsgAppImageData = (fileData) => {
        setCampaign({
            ...campaign
            , msg_app_img: fileData
        });
    }
    
    const handleMsgAppImageFile = (file) => {
        setMsgAppImgFile(file);
    }

    const deleteMsgAppImage = (e) => {
        setCampaign({
            ...campaign
            , msg_app_img: null
        });
        setMsgAppImgFile(null);
    }

    const setRctTargetData = (fileData) => {
        setCampaign({
            ...campaign
            , rct_target: fileData
        });
    }
    
    // TO-DO : csv 파일 validation check 추가
    const handleRctTargetFile = (e) => {
        console.log(e.target.files[0]);
        console.log("setLinkPsYn2Value ================== ")
        console.log(e)
        console.log(e.target.files[0]);
        if(e.target.files[0]){

        }
        setRctTargetFile(e.target.files[0]);
    }

    const setUrlUploadData = (fileData) => {
        setCampaign({
            ...campaign
            , url_upload: fileData
        });
    }
    
    const handleUrlUploadFile = (e) => {
        setUrlUploadFile(e.target.files[0]);
    }

    const setCpNoUploadData = (fileData) => {
        setCampaign({
            ...campaign
            , cp_no_upload: fileData
        });
    }
    
    const handleCpNoUploadFile = (e) => {
        setCpNoUploadFile(e);
    }

    const handleAdvertiserSearch = (e) => {
        alert('광고주 검색');
    }
    
    const setCampaignTitleValue = (e, value) => {
        setCampaign({
            ...campaign
            , cmpgn_title: value
        });
    }

    const setCampaignPpsValue = (e, value) => {
        setCampaign({
            ...campaign
            , cmpgn_pps: value
        });
    }

    const setSendReqCntValue = (e, value) => {
        setCampaign({
            ...campaign
            , send_req_cnt: value
        });
    }

    const setSendDtYmdValue = (date) => {
        setCampaign({
            ...campaign
            , send_dt_ymd: date
        });
    }
    
    const setSendDtApValue = (obj) => {
        setCampaign({
            ...campaign
            , send_dt_ap: obj
        });
    }

    const setSendDtHhValue = (obj) => {
        setCampaign({
            ...campaign
            , send_dt_hh: obj
        });
    }

    const setSendDtMmValue = (obj) => {
        setCampaign({
            ...campaign
            , send_dt_mm: obj
        });
    }

    const setUseCmValue = (e, value) => {
        setCampaign({
            ...campaign
            , use_cm: value
        });
    }

    const setSendModeValue = (e, value) => {
        setCampaign({
            ...campaign
            , send_mode: value
        });
    }

    const setMgsTitleValue = (e, value) => {
        e.preventDefault();
        let checkByte = checkByteOfValue(value);
        
        if(checkByte > msgTitleMaxByte) {
            return;
        }
        setMsgTitleByte(checkByte);
        setCampaign({
            ...campaign
            , mgs_title: value
        });
    }

    const setMsgSummaryValue = (e, value) => {
        e.preventDefault();
        let checkByte = checkByteOfValue(value);
        
        if(checkByte > msgSummaryMaxByte) {
            return;
        }
        setMsgSummaryByte(checkByte);
        setCampaign({
            ...campaign
            , msg_summary: value
        });
    }

    const setSenderNoValue = (e, value) => {
        setCampaign({
            ...campaign
            , sender_no: value
        });
    }

    const setLinkPsUrl1Value = (e, value) => {
        setCampaign({
            ...campaign
            , link_ps_url_1: value
        });
    }

    const setLinkPsYn1Value = (value) => {
        setCampaign({
            ...campaign
            , link_ps_yn_1: value
        });
    }

    const setLinkPsUrl2Value = (e, value) => {
        setCampaign({
            ...campaign
            , link_ps_url_2: value
        });
    }

    const setLinkPsYn2Value = (value) => {
        setCampaign({
            ...campaign
            , link_ps_yn_2: value
        });
    }

    const setLinkPsUrl3Value = (e, value) => {
        setCampaign({
            ...campaign
            , link_ps_url_3: value
        });
    }

    const setLinkPsYn3Value = (value) => {
        setCampaign({
            ...campaign
            , link_ps_yn_3: value
        });
    }

    const setUrlUploadCvValue = (value) => {
        setCampaign({
            ...campaign
            , url_upload_cv: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let advtsIdValid, cmpgnTitleValid, cmpgnPpsValid, sendReqCntValid, sendDtYmdValid, sendDtApValid, sendDtHhValid, sendDtMmValid, sendModeValid, mgsTitleValid, msgSummaryValid, senderNoValid, rctTargetValid = false;
        let advtsIdMsg, cmpgnTitleMsg, cmpgnPpsMsg, sendReqCntMsg, sendDtYmdMsg, sendDtApMsg, sendDtHhMsg, sendDtMmMsg, sendModeMsg, mgsTitleMsg, msgSummaryMsg, senderNoMsg, rctTargetMsg  = "";
        
        if(!isEmpty(advertiserInfo) || (advertiserInfo && !isEmpty(advertiserInfo.advts_id))) {
            advtsIdValid = true;
        } else { 
            advtsIdMsg = "광고주를 선택해야 합니다.";
        }

        // if(!isEmpty(advertiserInfo.advts_id)){
        //     advtsIdValid = true;
        // } else { 
        //     advtsIdMsg = "광고주를 선택해야 합니다.";
        // }

        if(!isEmpty(campaign.cmpgn_title)){
            cmpgnTitleValid = true;
        } else { 
            cmpgnTitleMsg = "캠페인명을 입력해야 합니다.";
        }

        if(!isEmpty(campaign.cmpgn_pps)){
            cmpgnPpsValid = true;
        } else { 
            cmpgnPpsMsg = "캠페인 목적을 입력해야 합니다.";
        }

        if(!isNaN(campaign.send_req_cnt) && campaign.send_req_cnt > 0 && campaign.send_req_cnt < 500001){
            sendReqCntValid = true;
        } else { 
            sendReqCntMsg = "발송 요청 건수는 숫자, 1건 이상 500,000건 미만 이어야 합니다.";
        }

        if(!isEmpty(campaign.send_dt_ymd)){
            sendDtYmdValid = true;
        } else { 
            sendDtYmdMsg = "일자를 선택해 주세요.";
        }

        if(!isEmpty(campaign.send_dt_ap)){
            sendDtApValid = true;
        } else { 
            sendDtApMsg = "오전/오후를 선택해 주세요.";
        }

        if(!isEmpty(campaign.send_dt_hh)){
            sendDtHhValid = true;
        } else { 
            sendDtHhMsg = "시간을 선택해 주세요.";
        }

        if(!isEmpty(campaign.send_dt_mm)){
            sendDtMmValid = true;
        } else { 
            sendDtMmMsg = "시간을 선택해 주세요.";
        }

        if(!isEmpty(campaign.send_mode)){
            sendModeValid = true;
        } else { 
            sendModeMsg = "발송형식을 선택해 주세요. ";
        }

        if(!isEmpty(campaign.mgs_title)){
            mgsTitleValid = true;
        } else { 
            mgsTitleMsg = "메시지 제목을 입력해 주세요.";
        }

        if(!isEmpty(campaign.msg_summary)){
            msgSummaryValid = true;
        } else { 
            msgSummaryMsg = "메시지 내용을 입력해 주세요.";
        }

        if(!isEmpty(campaign.sender_no)){
            senderNoValid = true;
        } else { 
            senderNoMsg = "발신자 번호를 입력해 주세요. ";
        }

        if(!isEmpty(rctTargetFile)){
            rctTargetValid = true;
        } else { 
            rctTargetMsg = "수신자 대상 csv파일을 업로드해 주세요. ";
        }

        setCampaignValid({
            ...campaignValid
            , advts_id: advtsIdValid
            , cmpgn_title: cmpgnTitleValid
            , cmpgn_pps: cmpgnPpsValid
            , send_req_cnt: sendReqCntValid
            , send_dt_ymd: sendDtYmdValid
            , send_dt_ap: sendDtApValid
            , send_dt_hh: sendDtHhValid
            , send_dt_mm: sendDtMmValid
            , send_mode: sendModeValid
            , mgs_title: mgsTitleValid
            , msg_summary: msgSummaryValid
            , sender_no: senderNoValid
            , rct_target: rctTargetValid
        });
        setCampaignCaution({
            ...campaignCaution
            , advts_id: advtsIdMsg
            , cmpgn_title: cmpgnTitleMsg
            , cmpgn_pps: cmpgnPpsMsg
            , send_req_cnt: sendReqCntMsg
            , send_dt_ymd: sendDtYmdMsg
            , send_dt_ap: sendDtApMsg
            , send_dt_hh: sendDtHhMsg
            , send_dt_mm: sendDtMmValid
            , send_mode: sendModeMsg
            , mgs_title: mgsTitleMsg
            , msg_summary: msgSummaryMsg
            , sender_no: senderNoMsg
            , rct_target: rctTargetMsg
        });

        if(!advtsIdValid || !cmpgnTitleValid || !cmpgnPpsValid  || !sendReqCntValid
            || !sendDtYmdValid || !sendDtApValid || !sendDtHhValid || !sendDtMmValid || !sendModeValid 
            || !mgsTitleValid || !msgSummaryValid || !senderNoValid  || !rctTargetValid) {
            alert("입력 항목 오류");
            return;
        }

        let formData = new FormData();
        formData.append("advts_id", advertiserInfo.advts_id);
        formData.append("cmpgn_title", campaign.cmpgn_title);
        formData.append("cmpgn_pps", campaign.cmpgn_pps);
        formData.append("send_req_cnt", campaign.send_req_cnt);
        formData.append("send_dt_ymd", changeFormat(campaign.send_dt_ymd, 'YYYY-MM-DD'));
        formData.append("send_dt_ap", campaign.send_dt_ap.value);
        formData.append("send_dt_hh", campaign.send_dt_hh.value);
        formData.append("send_dt_mm", campaign.send_dt_mm.value);
        formData.append("use_cm", (campaign.use_cm ? 'Y' : 'N'));
        formData.append("send_mode", campaign.send_mode);
        formData.append("mgs_title", campaign.mgs_title);
        formData.append("msg_summary", campaign.msg_summary);
        formData.append("sender_no", campaign.sender_no);
        formData.append("link_ps_url_1", campaign.link_ps_url_1);
        formData.append("link_ps_yn_1", (campaign.link_ps_yn_1 ? 'Y' : 'N'));
        formData.append("link_ps_url_2", campaign.link_ps_url_2);
        formData.append("link_ps_yn_2", (campaign.link_ps_yn_2 ? 'Y' : 'N'));
        formData.append("link_ps_url_3", campaign.link_ps_url_3);
        formData.append("link_ps_yn_3", (campaign.link_ps_yn_3? 'Y' : 'N'));
        formData.append("url_upload_cv", (campaign.url_upload_cv ? 'Y' : 'N'));

        // 파일 첨부
        formData.append("msg_app_img_file", msgAppImgFile);
        formData.append("rct_target_file", rctTargetFile);
        formData.append("url_upload_file", urlUploadFile);
        formData.append("cp_no_upload_file", cpNoUploadFile);

        onSubmit(e, formData);
    };


    // render
    return (
        <div className={cx("regist_box")}>
            <div className={cx("board_write")}>
                <span className={cx("add_title")} >광고주 정보</span>
                <table className={cx("mt10", "mb20")} >
					<colgroup>
						<col width="13%" /><col width="37%" /><col width="13%" /><col width="37%" />
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><label2 for="PTjoin_name" className={cx("label2")}>광고주 아이디</label2></th>
							<td colSpan="3">
                                <InputText 
                                    id="advts_id"
                                    size="27"
                                    placeholder="광고주 아이디"
                                    value={advertiserInfo ? advertiserInfo.advts_id : ''}
                                    caution={campaignCaution.advts_id}
                                    readonly
                                />
								<Button
                                    type="btn_small"
                                    onClick={(e) => {
                                        handleAdvtsSearchPopupOpen(e);
                                    }}
                                    >
                                    광고주조회
                                </Button>
							</td>
						</tr>
						<tr>
                            <th scope="row"><label2 for="PTjoin_name" className={cx("label2")}>광고주명</label2></th>
							<td>
                                <InputText 
                                    id="advts_nm"
                                    size="27"
                                    value={advertiserInfo ? advertiserInfo.advts_nm : ''}
                                    readonly
                                />
                            </td>
							<th scope="row"><label2 for="PTjoin_name" className={cx("label2")}>담당자명</label2></th>
							<td>
                                <InputText 
                                    id="advts_mng_nm"
                                    size="27"
                                    value={advertiserInfo ? advertiserInfo.advts_mng_nm : ''}
                                    readonly
                                />
                            </td>
						</tr>
						<tr>
							<th scope="row"><label2 for="PTjoin_name" className={cx("label2")}>이메일</label2></th>
							<td>
                                <InputText 
                                    id="email_addr"
                                    size="27"
                                    value={advertiserInfo ? advertiserInfo.email_addr : ''}
                                    readonly
                                />
                            </td>
							<th scope="row"><label2 for="PTjoin_name" className={cx("label2")}>연락처</label2></th>
							<td>
                                <InputText 
                                    id="email_addr"
                                    size="27"
                                    value={advertiserInfo ? advertiserInfo.phone_no : ''}
                                    readonly
                                />
                            </td>
						</tr>
					</tbody>
				</table>
                <span className={cx("add_title")}>캠페인 정보</span>
                <table className={cx("mt10")}>
                    <colgroup>
                        <col width="13%" /><col width="37%" /><col width="13%" /><col width="37%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row"><label2 for="PTjoin_name" className={cx("label2")}>캠페인명</label2></th>
                            <td colspan="3">
                                <InputText 
                                    id="cmpgn_title"
                                    size="100"
                                    style={{width: "87%"}}
                                    value={campaign.cmpgn_title}
                                    caution={campaignCaution.cmpgn_title}
                                    onChange={(e) => {
                                        setCampaignTitleValue(e, e.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label2 for="PTjoin_name" className={cx("label2")}>캠페인 목적</label2></th>
                            <td colspan="3">
                                <InputText 
                                    id="cmpgn_pps"
                                    size="100"
                                    style={{width: "87%"}}
                                    value={campaign.cmpgn_pps}
                                    caution={campaignCaution.cmpgn_pps}
                                    onChange={(e) => {
                                        setCampaignPpsValue(e, e.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label2 for="PTjoin_id" className={cx("label2")}>발송 요청 건수</label2></th>
                            <td>
                                <InputText 
                                    id="send_req_cnt"
                                    size="100"
                                    maxlength="6"
                                    style={{width: "70%"}}
                                    value={campaign.send_req_cnt}
                                    caution={campaignCaution.send_req_cnt}
                                    onChange={(e) => {
                                        setSendReqCntValue(e, e.target.value);
                                    }}
                                />
                            </td>
                            <th scope="row"><label2 for="PTjoin_id" className={cx("label2")}>인증마크</label2></th>
                            <td>
                                <div style={{float: 'left', width: '100%'}} >
                                    <InputRadio 
                                        id="use_cm1"
                                        name="use_cm" 
                                        value="N"
                                        checked={campaign.use_cm === "N"}
                                        onChange={(e) => {
                                            setUseCmValue(e, e.target.value);
                                        }}
                                        label="미사용"
                                    />
                                    <InputRadio 
                                        id="use_cm2"
                                        name="use_cm" 
                                        value="Y"
                                        checked={campaign.use_cm === "Y"}
                                        onChange={(e) => {
                                            setUseCmValue(e, e.target.value);
                                        }}
                                        label="사용"
                                    />
                                </div>
                                {/* <label>
                                    <input 
                                        type="radio" 
                                        name="use_cm" 
                                        value="N"
                                        checked={campaign.use_cm === "N"}
                                        onChange={(e) => {
                                            setUseCmValue(e, e.target.value);
                                        }}
                                    />
                                    <span className={cx("ico")}></span>
                                    <span className={cx("txt2")}>미사용</span>
                                </label>
                                <label class="radio">
                                    <input 
                                        type="radio" 
                                        name="use_cm" 
                                        value="Y"
                                        checked={campaign.use_cm === "Y"}
                                        onChange={(e) => {
                                            setUseCmValue(e, e.target.value);
                                        }}
                                    />
                                    <span class="ico"></span>
                                    <span class="txt2">사용</span>
                                </label> */}
                                <div style={{display: 'inline-block'}}>
                                    {(campaignCaution.use_cm !== "")
                                    ? <p className={cx("caution", "caution:after")}>{campaignCaution.use_cm}</p> : null}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label2 for="PTjoin_pw" className={cx("label2")}>발송요청일시</label2></th>
                            <td>
                                <div style={{float: 'left', width: '100%'}} >
                                    <div className={cx("datepickerWrap")}>
                                        <span>
                                            <DatePicker
                                                id="send_dt_ymd"
                                                selected={campaign.send_dt_ymd}
                                                onChange={date => setSendDtYmdValue(date)}
                                                isClearable="true"
                                                dateFormat="yyyy/MM/dd"
                                            />
                                        </span>
                                    </div>
                                    <span className={cx("inselect")}>
                                        <InputSelect
                                            type="select"
                                            id="send_dt_ap"
                                            placeholder="오전/오후"
                                            value={campaign.send_dt_ap}
                                            caution={campaignCaution.send_dt_ap}
                                            options={dateAPOptions}
                                            onChange={(value) => {
                                                setSendDtApValue(value);
                                            }}
                                        />
                                    </span>
                                    <span className={cx("inselect")}>
                                        <InputSelect
                                            type="select"
                                            id="send_dt_hh"
                                            placeholder="시간"
                                            value={campaign.send_dt_hh}
                                            caution={campaignCaution.send_dt_hh}
                                            options={createDateOption("hh")}
                                            onChange={(value) => {
                                                setSendDtHhValue(value);
                                            }}
                                        />
                                    </span>
                                    <span className={cx("inselect")}>
                                        <InputSelect
                                            type="select"
                                            id="send_dt_mm"
                                            placeholder="분"
                                            value={campaign.send_dt_mm}
                                            caution={campaignCaution.send_dt_mm}
                                            options={createDateOption("mm")}
                                            onChange={(value) => {
                                                setSendDtMmValue(value);
                                            }}
                                        />
                                    </span>
                                </div>
                                <div style={{display: 'inline-block'}}>
                                {(campaignCaution.send_dt_ymd !== "")
                                 ? <p className={cx("caution", "caution:after")}>{campaignCaution.send_dt_ymd}</p> : null}
                                 {(campaignCaution.send_dt_ap !== "")
                                 ? <p className={cx("caution", "caution:after")}>{campaignCaution.send_dt_ap}</p> : null}
                                 {(campaignCaution.send_dt_hh !== "")
                                 ? <p className={cx("caution", "caution:after")}>{campaignCaution.send_dt_hh}</p> : null}
                                 {(campaignCaution.send_dt_mm !== "")
                                 ? <p className={cx("caution", "caution:after")}>{campaignCaution.send_dt_mm}</p> : null}
                                 </div>
                            </td>
                            <th scope="row"><label2 for="PTjoin_id" className={cx("label2")}>발송형식</label2></th>
                            <td>
                                <div style={{float: 'left', width: '100%'}} >
                                <InputRadio 
                                    id="send_mode1"
                                    name="send_mode"
                                    value="LMS"
                                    checked={campaign.send_mode === "LMS"}
                                    tip="LMS(Long Messaging Service) : 장문 문자 메시지 서비스"
                                    onChange={(e) => {
                                        setSendModeValue(e, e.target.value);
                                    }}
                                    label="LMS"
                                />
                                <InputRadio 
                                    id="send_mode2"
                                    name="send_mode"
                                    value="MMS"
                                    checked={campaign.send_mode === "MMS"}
                                    tip="MMS(Multimedia Messaging Service) : 사진 첨부하여 보내는 문자 메시지 서비스"
                                    onChange={(e) => {
                                        setSendModeValue(e, e.target.value);
                                    }}
                                    label="MMS"
                                />
                                <InputRadio 
                                    id="send_mode3"
                                    name="send_mode"
                                    value="RCS"
                                    checked={campaign.send_mode === "RCS"}
                                    tip="RCS(Rich Communication Service) : 기존 문자메시지보다 고화질 미디어를 전달 할 수 있는 서비스"
                                    onChange={(e) => {
                                        setSendModeValue(e, e.target.value);
                                    }}
                                    label="RCS"
                                />
                                </div>
                                <div style={{display: 'inline-block'}}>
                                {(campaignCaution.send_mode !== "")
                                 ? <p className={cx("caution", "caution:after")}>{campaignCaution.send_mode}</p> : null}
                                 </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label2 for="PTjoin_name" className={cx("label2")}>메세지 제목</label2></th>
                            <td colspan="3">
                                <div style={{float: 'left', width: '100%'}}>
                                    <InputText 
                                        id="mgs_title"
                                        size="100"
                                        style={{width: "87%"}}
                                        value={campaign.mgs_title}
                                        caution={campaignCaution.mgs_title}
                                        onChange={(e) => {
                                            setMgsTitleValue(e, e.target.value);
                                        }}
                                    />
                                    {msgTitleByte}/{msgTitleMaxByte} Byte
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label2 for="PTjoin_attach" className={cx("label2")}>메세지 내용</label2></th>
                            <td colspan="3">
                                <div style={{float: 'left', width: '100%'}}>
                                    <InputTextArea
                                        id="msg_summary"
                                        rows={7}
                                        maxLength={msgSummaryMaxByte}
                                        maxByte={msgSummaryMaxByte}
                                        maxByteLabel
                                        currentByte={msgSummaryByte}
                                        value={campaign.msg_summary}
                                        caution={campaignCaution.msg_summary}
                                        onChange={(e) => {
                                            setMsgSummaryValue(e, e.target.value);
                                        }}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label2 for="PTjoin_name" className={cx("label2")}>MMS/RCS 이미지 첨부</label2></th>
                            <td colspan="3">
                                <span className={cx("photo")} style={{width: "250px",height: "150px", padding: '0px'}}>
                                    <ImageDropZone
                                        imageData={campaign.msg_app_img}
                                        handleImageData={setMsgAppImageData}
                                        handleImageFile={handleMsgAppImageFile}
                                        ref={advtsImgRef}
                                    />
                                </span>
                                <Button
                                    type="btn_small"
                                    onClick={(e) => {
                                        deleteMsgAppImage(e);
                                    }}
                                    >
                                    이미지 제거
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label2 for="PTjoin_name" className={cx("label2")}>발신자 번호</label2></th>
                            <td colspan="3">
                                <InputText 
                                    id="mgs_title"
                                    size="100"
                                    style={{width: "87%"}}
                                    value={campaign.sender_no}
                                    placeholder="숫자만 입력하세요."
                                    caution={campaignCaution.sender_no}
                                    onChange={(e) => {
                                        setSenderNoValue(e, e.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label2 for="PTjoin_name" className={cx("label2")}>수신대상 업로드</label2></th>
                            <td colspan="3">
                                <input 
                                    type="file" 
                                    id="rct_target" 
                                    className={cx("intext")} 
                                    style={{width: "87%"}}  
                                    placeholder="CVS 파일만 업로드 가능합니다." 
                                    accept=".csv"
                                    onChange={(e) => {
                                        handleRctTargetFile(e);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" rowSpan="3"><label2 for="PTjoin_name" className={cx("label2")}>링크URL개인화(선택)</label2></th>
                            <td colspan="3">
                                <InputCheckBox 
                                    id="link_ps_yn_1"
                                    checked={campaign.link_ps_yn_1}
                                    onChange={(e) => {
                                        setLinkPsYn1Value(!campaign.link_ps_yn_1);
                                    }}
                                />
                                <span className={cx("txt2")} style={{margin: '0px 10px'}}>개인화 여부</span>
                                <InputText 
                                    id="link_ps_url_1"
                                    size="100"
                                    style={{width: "87%"}}
                                    value={campaign.link_ps_url_1}
                                    placeholder="http:// 또는 https://를 포함하여 링크 URL 주소를 입력하여주세요." 
                                    caution={campaignCaution.link_ps_url_1}
                                    onChange={(e) => {
                                        setLinkPsUrl1Value(e, e.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <InputCheckBox 
                                    id="link_ps_yn_2"
                                    checked={campaign.link_ps_yn_2}
                                    onChange={(e) => {
                                        setLinkPsYn2Value(!campaign.link_ps_yn_2);
                                    }}
                                />
                                <span className={cx("txt2")} style={{margin: '0px 10px'}}>개인화 여부</span>
                                <InputText 
                                    id="link_ps_url_2"
                                    size="100"
                                    style={{width: "87%"}}
                                    value={campaign.link_ps_url_2}
                                    placeholder="http:// 또는 https://를 포함하여 링크 URL 주소를 입력하여주세요." 
                                    caution={campaignCaution.link_ps_url_2}
                                    onChange={(e) => {
                                        setLinkPsUrl2Value(e, e.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <InputCheckBox 
                                    id="link_ps_yn_3"
                                    checked={campaign.link_ps_yn_3}
                                    onChange={(e) => {
                                        setLinkPsYn3Value(!campaign.link_ps_yn_3);
                                    }}
                                />
                                <span className={cx("txt2")} style={{margin: '0px 10px'}}>개인화 여부</span>
                                <InputText 
                                    id="link_ps_url_3"
                                    size="100"
                                    style={{width: "87%"}}
                                    value={campaign.link_ps_url_3}
                                    placeholder="http:// 또는 https://를 포함하여 링크 URL 주소를 입력하여주세요." 
                                    caution={campaignCaution.link_ps_url_3}
                                    onChange={(e) => {
                                        setLinkPsUrl3Value(e, e.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label2 for="PTjoin_name" className={cx("label2")} style={{margin: '5px 0px'}}>URL 업로드</label2>
                                <Button
                                    type="btn_small"
                                    >
                                    <Link to="/form/url_upload_form.xlsx" target="_blank" download>엑셀양식파일 <br/> 다운로드</Link>
                                </Button>
                            </th>
                            <td colspan="3">
                                <div style={{float: 'left', width: '100%'}} >
                                    <input 
                                        type="file" 
                                        id="url_upload" 
                                        className={cx("intext")}  
                                        placeholder="*xlsx 엑셀파일만 등록가능" 
                                        accept=".xlsx"
                                        onChange={(e) => {
                                            handleUrlUploadFile(e);
                                        }}
                                    />
                                    
                                    <InputCheckBox 
                                        id="url_upload_cv"
                                        checked={campaign.url_upload_cv}
                                        onChange={(e) => {
                                            setUrlUploadCvValue(!campaign.url_upload_cv);
                                        }}
                                    />
                                    <span className={cx("txt2")} style={{margin: '0px 10px'}}>URL 변환사용</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label2 for="PTjoin_name" className={cx("label2")} style={{margin: '5px 0px'}}>쿠폰번호 업로드</label2>
                                <Button
                                    type="btn_small"
                                >
                                    <Link to="/form/coupon_no_upload_form.xlsx" target="_blank" download>엑셀양식파일 <br/> 다운로드</Link>
                                </Button>
                            </th>
                            <td colspan="3">
                                <input 
                                    type="file" 
                                    id="cp_no_upload" 
                                    className={cx("intext")}  
                                    placeholder="*xlsx 엑셀파일만 등록가능" 
                                    accept=".xlsx"
                                    onChange={(e) => {
                                        handleCpNoUploadFile(e);
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
                    onClick={onCancel}
                    >
                    취소
                </Button>
                <Button
                    type="btn_black"
                    onClick={(e) => {
                        handleSubmit(e);
                    }}
                    >
                    저장
                </Button>
            </div>
        </div>
    )
}

export default CampaignForm;