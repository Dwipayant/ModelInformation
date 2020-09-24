import React, { useState, useEffect } from 'react'
import { Descriptions, Button } from 'antd';
import '../Sections/detailView.css';

function ModelInfo(props) {
    const [Model, setModel] = useState({})
    useEffect(() => {
        if (props.detail) {
            setModel(props.detail)
        }
    }, [props.detail])

    return (<div>
        <table style={{ "width": "100%" }}>
            <tr>
                <th>Model Wear</th>
                <th>Height</th>
                <th>Bust</th>
            </tr>
            <tr>
                <td>{Model.modelWear}</td>
                <td>{Model.height}</td>
                <td>{Model.bust}</td>
            </tr>
            <tr>
                <th>Waist</th>
                <th>High Hip</th>
                <th>Low Hip</th>
            </tr>
            <tr>
                <td>{Model.waist}</td>
                <td>{Model.highhip}</td>
                <td>{Model.lowhip}</td>
            </tr>
        </table>
    </div>)
}

export default ModelInfo
