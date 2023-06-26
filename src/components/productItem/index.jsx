import { Card } from 'antd';
const { Meta } = Card;
const ProductItem = ({product}) => (
    <Card
        hoverable
        style={{
            width: 240,
        }}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
        <Meta title={product.mainText} description={product.author} />
    </Card>
);
export default ProductItem;