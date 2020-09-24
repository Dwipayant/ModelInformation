import React, { useState } from 'react'
import { Input } from 'antd';
const { Search } = Input;

function SearchBox(props) {
    const [SearchTerms, setSearchTerms] = useState("")
    const onChangeSearch = (event)=>{
        setSearchTerms(event.currentTarget.value)
        props.handleSearch(event.currentTarget.value)
    }
    return (
        <div>
           <Search
            placeholder="input search text"
            value={SearchTerms}
            onChange={onChangeSearch}
            />
        </div>
    )
}

export default SearchBox
