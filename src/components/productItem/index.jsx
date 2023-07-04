import {Card, Typography} from 'antd';
import {convertVND} from "../../function/index.jsx";
const { Meta } = Card;
const ProductItem = ({product}) => {
    return (
        <Card
            hoverable
            cover={<img alt="example" src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${product?.thumbnail}`} style={{width: '100%%'}}/>}
        >
            <Meta title={product.mainText}/>
            <Typography.Title level={4} style={{color: "red", fontWeight: "bold", margin: "15px 0"}}>{convertVND(product.price)}</Typography.Title>
            {product.quantity > 0 ?
                <Typography.Paragraph>{product.sold} sold</Typography.Paragraph> :
                <Typography.Paragraph style={{color: 'red', fontWeight: 'bold'}}>Out of order</Typography.Paragraph>
            }
        </Card>
    );
}
export default ProductItem;