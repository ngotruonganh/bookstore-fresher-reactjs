import {getHistoryOrder} from "../../services/useServer.jsx";
import {useEffect, useState} from "react";

const OrderHistory = () => {
    const [order, setOrder] = useState([]);
    useEffect(() => {
        getOrder();
    }, []);

    const getOrder = async () => {
        const res =  await getHistoryOrder();
        if(res && res.data){
            setOrder(res.data.data.result);
        }
    }

    return (
        <>
        {order.map((item) => {
            return (
                <div key={item._id}>
                    <span>{item.name}</span>&nbsp;
                    <span>{item.phone}</span>
                </div>
            )
        })}
        </>
    );
};

export default OrderHistory;
