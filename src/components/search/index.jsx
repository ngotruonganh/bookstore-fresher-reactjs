import React from 'react';
import {Input} from "antd";

const {Search} = Input;

const SearchField = () => {
    return (
        <Search placeholder="search" style={{width: "100%", padding: "10px"}}/>
    );
};

export default SearchField;
