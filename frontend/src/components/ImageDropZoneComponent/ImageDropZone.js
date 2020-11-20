import React, { useState, useEffect, useRef, useMemo, useCallback, useImperativeHandle } from 'react';
import Dropzone from "react-dropzone";
// import { useDropzone } from "react-dropzone"
import classNames from 'classnames/bind';
import styles from './ImageDropZone.module.css';

const cx = classNames.bind(styles);

const ImageDropZone = React.forwardRef((props, ref) => {
    const {
        imageData, handleImageData, handleImageFile
    } = props;

    const [dropImage, setDropImage] = useState(null);
    const imgDropzoneRef = useRef(ref);
    useEffect(() => {
        console.log("===============================================")
        console.log(imageData)
        console.log("------------------------------------------------------")
        if(imageData !== undefined && imageData !== null) {
            setDropImage(imageData);
        }
    }, [dropImage]);

    useImperativeHandle(ref, () => ({
        filePopupOpen() {
            imgDropzoneRef.current.open();
        }
    }));


    const onDrop = (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
      
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = (e) => {
                setDropImage(e.target.result);
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
            >
        {({getRootProps, getInputProps, isDragActive}) => {
            return (
                <div {...getRootProps({className: isDragActive ? cx("baseStyle", "activeStyle") : cx("baseStyle")})} style={{width: '88%', height: '85%'}} className={isDragActive ? cx("baseStyle", "activeStyle") : cx("baseStyle")} >
                    <input {...getInputProps({
                            onDrop: e => e.stopPropagation()
                        })} />
                    {imageData && imageData === undefined || imageData === null ? (
                        <p className="dropzone-content">
                            여기에 파일을 놓으려면 놓으십시오 <br />
                            +
                        </p>
                    ) : (
                        <img src={imageData} alt="여기에 일부 파일을 끌어다 놓거나 클릭하여 파일을 선택하세요" width="90%" height="90%" style={imageData !== "" ?  {display: 'inline-block'} : {display: 'none'}}/>
                    )}

                    {isDragActive ? (
                        <p className="dropzone-content">여기에 일부 파일을 끌어다 놓거나 클릭하여 파일을 선택하세요</p>
                    ) : (null)}
                </div>
            );
        }}
        </Dropzone>
    );
});

export default ImageDropZone;