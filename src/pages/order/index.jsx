import {useSelector} from "react-redux";
import {Button, Divider} from "antd";

const Order = () => {
    const orderList = useSelector(state => state.order.cart)
    console.log(orderList);
    return (
        <>
            {orderList.map((item) => {
                return (
                    <>
                        <div key={item._id} style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                            <div>{item.detail.mainText}</div>
                            <div>{item.detail.price}</div>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Button>-</Button>
                                <div>{item.quantity}</div>
                                <Button>+</Button>
                            </div>
                            <div>
                                Tong
                            </div>
                            <Button>Delete</Button>
                        </div>
                        <Divider/>
                    </>
                )
            })}
            <div style={{display:"flex", justifyContent: "end", alignItems: "center"}}>
                <p>Total (0 item): d39000 </p>
                <Button>Check Out</Button>
            </div>
        </>
    )
};


export default Order;
