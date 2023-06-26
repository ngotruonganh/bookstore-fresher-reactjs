import {Card, Typography} from 'antd';
const { Meta } = Card;
const ProductItem = ({product}) => {
    return (
        <Card
            hoverable
            style={{
                width: 240,
            }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
        >
            <Meta title={product.mainText} description={product.author}/>
            <Typography.Paragraph style={{color: "red"}}>d{product.price}</Typography.Paragraph>
            <Typography.Paragraph>{product.sold}</Typography.Paragraph>
        </Card>
    );
}
export default ProductItem;