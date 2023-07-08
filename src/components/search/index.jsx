import {Input} from "antd";
import {useDispatch} from "react-redux";
import {searchAction} from "../../redux/search/searchSlice.jsx";

const {Search} = Input;

const SearchField = () => {
    const dispatch = useDispatch();
    const onSearch = (value) => {
        dispatch(searchAction(value));
    }
    return (
        <Search placeholder="search" onSearch={onSearch} style={{width: "100%", padding: "10px"}} />
    );
};

export default SearchField;
