import React, { useRef, useCallback, useImperativeHandle } from 'react';
import Dropzone from "react-dropzone";
// import { useDropzone } from "react-dropzone"
import classNames from 'classnames/bind';
import styles from './ImageDropZone.module.css';

const cx = classNames.bind(styles);

const ImageDropZone = React.forwardRef((props, ref) => {
    const {
        imageData, handleImageData, handleImageFile, ...others
    } = props;

    const imgDropzoneRef = useRef(ref);
    
    useImperativeHandle(ref, () => ({
        filePopupOpen() {
            imgDropzoneRef.current.open();
        }
    }));

    const onDrop = (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            let fileName = file.name;
    
            if (unescape(encodeURI(fileName)).length < 2) {
                alert("파일명이 너무 깁니다.");
                return;
            }
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = (e) => {
                handleImageData(e.target.result);
            }
            reader.readAsDataURL(file);
            handleImageFile(file);
        });
    }

    return (
        <Dropzone 
            ref={imgDropzoneRef} 
            onDrop={onDrop} 
            accept="image/*"
            {...others}
            >
            {({getRootProps, getInputProps}) => {
                return (
                    <div {...getRootProps()} style={{width: '100%', height: '100%'}} >
                        <input {...getInputProps({
                                onDrop: e => e.stopPropagation()
                            })} />
                        {imageData === undefined || imageData === null || imageData === '' ? (
                            <div style={{textAlign: 'center', paddingTop: '20px'}}>MMS/RCS Image <br/>
                            업로드할 파일을 선택 또는 파일을 끌어 놓기
                            </div>
                        ) : (
                            <img src={imageData} alt="" width="100%" height="100%" style={imageData !== "" ?  {display: 'inline-block'} : {display: 'none'}}/>
                        )}
                    </div>
                );
            }}
        </Dropzone>
    );
});

export default ImageDropZone;