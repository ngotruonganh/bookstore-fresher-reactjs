import {Card, Typography} from 'antd';
const { Meta } = Card;
const ProductItem = ({product}) => {
    return (
        <Card
            hoverable
            cover={<img alt="example" src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${product?.thumbnail}`}/>}
        >
            <Meta title={product.mainText}/>
            <Typography.Paragraph style={{color: "red"}}>₫{product.price}</Typography.Paragraph>
            <Typography.Paragraph>{product.sold}</Typography.Paragraph>
        </Card>
    );
}
export default ProductItem;