import {Pagination} from 'antd';
const PaginationComponent = ({current, pageSize, total, onChange}) => {
    return (
        <Pagination current={current} pageSize={pageSize} total={total} onChange={onChange} />
    )
}

export default PaginationComponent;