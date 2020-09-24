import React, {useState}from 'react';
import{ Typography, Button, Form, message, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

export default function UploadModelPage(props) {
    const [ModelNameValue, setModeNameValue] = useState("");
    const [ModelWearValue, setModelWearValue] = useState("");
    const [HeightValue, setonHeightValue] = useState("");
    const [BustValue, setBustValue] = useState(0);
    const [WaistValue, setWaistValue] = useState(1)
    const [HighHipValue, setHihgHipValue] = useState(1)
    const [LowHipValue, setLowHipValue] = useState(1)
    const [Images, setImages] = useState([]);
    const history = useHistory();

    const onModelNameChange = (event) => {
        setModeNameValue(event.currentTarget.value);
    }

    const onModelWearChange = (event)=>{
        setModelWearValue(event.currentTarget.value);
    }

    const onHeightChange = (event)=>{
        setonHeightValue(event.currentTarget.value);
    }

    const onBustValueChange = (event)=>{
        setBustValue(event.currentTarget.value);
    }

    const onWaistValueChange = (event)=>{
        setWaistValue(event.currentTarget.value);
    }

    const onHighHipValueChange = (event) => {
        setHihgHipValue(event.currentTarget.value);
    }

    const onLowHipValueCHange = (event) => {
        setLowHipValue(event.currentTarget.value);
    }

    const updateImages = (image)=> {
        setImages(image);
    }

    const onSubmit =(event)=> {
        event.preventDefault();
        const payload = {
            writer: props.user.userData._id,
            modelWear: ModelWearValue,
            height: HeightValue,
            bust: BustValue,
            images: Images,
            waist: WaistValue,
            highhip:HighHipValue,
            lowhip:LowHipValue,
            modelname: ModelNameValue
        }
       
        if(!ModelWearValue || !HeightValue || !BustValue || !WaistValue || !Images ){
            return alert('Please Fill all the fields');
        }

        Axios.post('/api/model/uploadModel', payload)
        .then(response => {
            if(response.data.success){
                alert('Model succesfully uploaded');
                props.history.push('/');
            }else{
                alert('Failed to upload Model');
            }
        })
    }

    const onCancel = () =>{
        history.push('/');
    }

    return (
        <div>
            <div style={{ maxWidth: '700px',  margin: '2rem auto'}}>
                <div style={{ textAlign: "center", marginBottom: "2rem"}}>
                    <Title level="2">Upload Model Page</Title>
                </div>   
                <Form>
                     <FileUpload
                        refreshFunction={updateImages}
                     />
                   <br/><br/>
                   <label>Model Name</label>
                   <Input 
                        onChange={onModelNameChange}
                        value={ModelNameValue}
                   />
                    <br/>
                    <br/>
                   <label>Model Wear</label>
                   <Input
                        onChange={onModelWearChange}
                        value={ModelWearValue}
                   />
                   <br/>
                   <br/>
                   <label>Height</label>
                   <Input
                        onChange={onHeightChange}
                        value={HeightValue}
                   />
                   <br/>
                   <br/>
                   <label>BUST</label>
                   <Input
                        onChange={onBustValueChange}
                        value={BustValue}
                   />

                   <br/>
                   <br/>
                   <label>WAIST</label>
                   <Input
                        onChange={onWaistValueChange}
                        value={WaistValue}
                   />
                   <br/>
                   <br/>
                   <label>HIGH HIP</label>
                   <Input
                        onChange={onHighHipValueChange}
                        value={HighHipValue}
                   />
                   <br/>
                   <br/>
                   <label>LOW HIP</label>
                   <Input
                        onChange={onLowHipValueCHange}
                        value={LowHipValue}
                   />
                   <Button onClick={onSubmit} >Submit</Button>
                   <Button onClick={onCancel}>Cancle</Button>
                </Form>
            </div>
        </div>
    )
}
