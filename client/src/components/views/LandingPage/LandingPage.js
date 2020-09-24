import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Row, Card, Button, Layout } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import SearchBox from './Sections/SearchBox';
import { useHistory } from 'react-router-dom';
import ModelInfo from '../ModelDetailPage/Sections/ModelInfo';
import './landing.css';
import { useDispatch } from "react-redux";
import { editModelData } from '../../../_actions/userActions';

const { Meta } = Card;
const { Sider, Content } = Layout;

function LandingPage() {
    const [Model, setModel] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState();
    const [SearchTerm, setSearchTerm] = useState('')
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const history = useHistory();

    useEffect(()=>{
        let payload = {
            skip: Skip,
            limit: Limit
        }
        getModels(payload);
    }, [])

    const getModels = (payload)=>{
        Axios.post('/api/model/getModels', payload)
        .then(response => {
            if(response.data.success){
                if(payload.loadMore){
                    setModel([...Model, ...response.data.models])
                }else{
                    setModel(response.data.models);
                }
                setPostSize(response.data.postSize);
                
            }else{
                alert('Failed to fetch Models')
            }
        })
    }

    const editModel = (model) => {
        history.push(`/editModel/${model._id}`);
    }

    const deleteModel = (id) => {
        console.log(id);
        Axios.delete('/api/model/deleteModel', { params: { id: id } }).then(response => {
            if(response.data.success) { 
                history.push('/');
            }
        })
    }

    const renderCards = Model.map((model, index) => {
        return (<>
        <div className="blog-card">
            <div className="meta">
                <div className="photo">
                        <ImageSlider images={model.images} />
                </div>
                <ul className="details">
                    <li>Model Name <a href="#">{model.modelname}</a></li>
                    <li className="author"onClick={()=>editModel(model)}><a href="#" >Edit</a></li>
                    <li className="author"><a href="#" onClick={()=>deleteModel(model._id)}>Delete</a></li>
                </ul>
            </div>
            <div className="description">
                <ModelInfo detail={model} />
                <p className="read-more">
                <a href={`/model/${model._id}`}>Detail</a>
                </p>
            </div>
        </div>
      </>)
    })

    const onLoadMore = ()=>{
        let skip = Skip + Limit;
        let payload = {
            skip: Skip,
            limit: Limit,
            loadMore: true
        }
        getModels(payload)
        setSkip(skip);
    }

    const updateSearchTerms = (newSerachTerms)=>{
        const payload = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSerachTerms
        }
        setSkip(0);
        setSearchTerm(newSerachTerms);
        getModels(payload);
    }

    const addNewModel = () =>{
        history.push('/model/upload');
    }

    return (
        <div style={{ width: '75%', margin: '2rem auto'}}>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <h1 style={{ textAlign: 'center'}}>Model List Page</h1>
            </div>
            <div><Button onClick={addNewModel}>Add New Model</Button></div>
            <div style={{display: 'flex', justifyContent: 'flex-end', margin: '1rem auto'}}>
                <SearchBox
                    handleSearch={updateSearchTerms}
                />
            </div>
           
            {Model.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>

                </div>
            }
            {
                PostSize >= Limit && 
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={onLoadMore}>Load More</Button>
                </div>
            }
        </div>
    )
}

export default LandingPage
