import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Row, Col} from 'antd';
import ModelImage from '../ModelDetailPage/Sections/ModelImage';
import ModelInfo from '../ModelDetailPage/Sections/ModelInfo';
import FileUpload from '../../utils/FileUpload';
import EditImageUpload from './Sections/EditImageUpload';
import EditModelDetail from './Sections/EditModelDetail';

function EditModelPage(props) {
    const modelId = props.match.params.modelId;
    const [Model, setModel] = useState([]);
    const [Images, setImages] = useState([]);

    useEffect(() => {
        Axios.get(`/api/model/models_by_id?id=${modelId}&type=single`)
        .then(response => {
             if(response.data) {
                 setModel(response.data[0]);
             }
        })
     }, []);
     
     const updateImages = (image) => {
        setImages(image);
        let modelImg = [];
        image.map((img, i)=>{
            if(!img.original)
            Model.images.push(img);
        });
    }

    const onDelete = (image)=>{
        let currentTargetImageIndex = Images.indexOf(image);
        let currentImage = [...Images];
        currentImage.splice(currentTargetImageIndex, 1);
        setImages(currentImage);
    }

    return(
    <div>
        <div style={{ width: '100%' }}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h2>Edit Model Page</h2>
            </div>
           <Row gutter={[16, 16]}>
               <Col lg={12} xs={24}>
                    <EditImageUpload
                            detail={Model}
                            refreshFunction={updateImages}
                        />
               </Col>
                    <Col lg={12} xs={24}>
                        <EditModelDetail detail={Model} />
               </Col>
           </Row>
        </div>
    </div>)
}

export default EditModelPage