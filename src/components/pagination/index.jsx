import {Pagination} from 'antd';

const PaginationComponent = ({defaultCurrent, pageSize, total, onChange}) => {

    return (
        <Pagination defaultCurrent={defaultCurrent} pageSize={pageSize} total={total} onChange={onChange}/>
    )
}
export default PaginationComponent;