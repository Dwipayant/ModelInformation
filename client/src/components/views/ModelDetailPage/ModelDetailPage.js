import React, { useState, useEffect} from 'react'
import { Row, Col} from 'antd';
import ModelImage from './Sections/ModelImage';
import ModelInfo from './Sections/ModelInfo';
import Axios from 'axios';
import { useDispatch} from 'react-redux';

function ModelDetailPage(props) {
    const modelId = props.match.params.modelId;
    const [Model, setModel] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
       Axios.get(`/api/model/models_by_id?id=${modelId}&type=single`)
       .then(response => {
            if(response.data){
                setModel(response.data[0]);
            }
       })
    }, [])
    
    return (
        <div  className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>
           <Row gutter={[16, 16]}>
               <Col lg={12} xs={24}>
                    <ModelImage detail={Model}/>
               </Col>
               <Col lg={12} xs={24}>
                    <ModelInfo detail={Model} />
                    <a href="/">Back</a>
               </Col>
               
           </Row>
           
        </div>
    )
}

export default ModelDetailPage
