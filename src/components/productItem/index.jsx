import {Card, Typography} from 'antd';
const { Meta } = Card;
const ProductItem = ({product}) => {
    return (
        <Card
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
        >
            <Meta title={product.mainText}/>
            <Typography.Paragraph style={{color: "red"}}>₫{product.price}</Typography.Paragraph>
            <Typography.Paragraph>{product.sold}</Typography.Paragraph>
        </Card>
    );
}
export default ProductItem;