import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios';

function FileUpload(props) {

    const [Images, setImages] = useState([]);

    const onDrop = (files)=>{
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        // Save the image we choose inside the Node Server
        Axios.post('/api/model/uploadImage', formData, config)
            .then(response => {
                if(response.data.success){
                    setImages([...Images, response.data.image]);
                    props.refreshFunction([...Images, response.data.image])
                }else{
                    alert('Failed to save the Image in Server')
                }
            })
    }

    const onDelete = (image)=>{
        let currentTargetImageIndex = Images.indexOf(image);
        let currentImage = [...Images];
        currentImage.splice(currentTargetImageIndex, 1);
        setImages(currentImage);
        props.refreshFunction(currentImage);
        
    }
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
           <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
           >
               {
                   ({getRootProps, getInputProps})=>(
                    <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center'}} {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <PlusOutlined  style={{fontSize: '3rem'}}/>
                    </div>
                   )
               }
           </Dropzone>
           <div style={{width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', justifyContent: 'center', overflowX: 'scroll'}}>
               {
                   Images.map((image, index)=>(
                    <div onClick={()=>onDelete(image)} >
                        <img
                            src={`http://localhost:5000/${image}`}
                            alt={`model-Image-${index}`}
                            style={{minWidth: '300px', width: '300px', height: '240px'}}
                            />
                    </div>
                   ))
               }
           </div>
        </div>
    )
}

export default FileUpload;
