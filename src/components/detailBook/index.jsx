import {Descriptions, Drawer} from 'antd';

const DetailBookAdmin = ({ item, open, onClose }) => {
    return (
        <Drawer
            open={open}
            onClose={onClose}
            closable={true}
            placement='left'
            size='large'
            title='Book Info'
        >
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Id" span={2}>{item._id}</Descriptions.Item>
                <Descriptions.Item label="Title">{item.mainText}</Descriptions.Item>
                <Descriptions.Item label="Author">{item.author}</Descriptions.Item>
                <Descriptions.Item label="Category">{item.category}</Descriptions.Item>
                <Descriptions.Item label="Price">{item.price}</Descriptions.Item>
                <Descriptions.Item label="quantity">{item.quantity}</Descriptions.Item>
                <Descriptions.Item label="Sold">{item.sold}</Descriptions.Item>
                <Descriptions.Item label="Created at">{item.createdAt}</Descriptions.Item>
                <Descriptions.Item label="Updated at">{item.updatedAt}</Descriptions.Item>
            </Descriptions>
        </Drawer>
    );
};

export default DetailBookAdmin;