import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';

function ModelImage(props) {
    const [Images, setImages] = useState([])

    useEffect(() => {
       if(props.detail.images && props.detail.images.length > 0){
           let images = [];
            props.detail.images.map((image)=>{
                images.push({
                    original: `http://localhost:5000/${image}`,
                    thumbnail: `http://localhost:5000/${image}`
                })
            })
            setImages(images)
       }

    }, [props.detail])


    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ModelImage
