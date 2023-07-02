import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Divider, InputNumber, Modal, Row, Typography} from "antd";

import {deleteItem, updateQuantity} from "../../redux/order/orderSlice.jsx";
import {Link, useNavigate} from "react-router-dom";

const Order = () => {
    const orderList = useSelector(state => state.order.cart);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const [deleteId, setDeleteId] = useState('');

    const showModal = (id) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        await dispatch(deleteItem(deleteId));
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setDeleteId('');
        setIsModalOpen(false);
    };
    const onChange = (value, item) => {
        console.log(value);
        if(isNaN(value)) return;
        else {
            dispatch(updateQuantity({_id: item._id, quantity: value, detail: item}));
        }
    }
    const navigate = useNavigate();
    const nonAccentVietnamese = (str) => {
        str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    const convertSlug = (str) => {
        str = nonAccentVietnamese(str);
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
        const to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    }
    const handleViewDetail = (book) => {
        const slug = convertSlug(book.mainText);
        navigate(`/${slug}?id=${book._id}`);
    }
    return (
        <>
            <Row align='middle' style={{marginTop: "10px", padding: '15px', backgroundColor: "white"}}>
                <Col span={10}>
                    <div>Product</div>
                </Col>
                <Col span={3}>
                    Unit Price
                </Col>
                <Col span={5} style={{justifyContent: "center"}}>
                    Quantity
                </Col>
                <Col span={4}>
                    Total Price
                </Col>
                <Col span={2} style={{justifyContent: 'center'}}>
                    Actions
                </Col>
            </Row>
            {orderList?.length === 0 && (
                <Row justify='center'>
                    <div>No</div>
                </Row>
            )}
            {orderList && orderList.length > 0 && orderList.map((item) => {
                return (
                    <Row key={item._id} align='middle' style={{marginTop: "10px", padding: '10px', backgroundColor: "white"}}>
                        <Col span={10}>
                            <img onClick={() => handleViewDetail(item)} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.detail?.thumbnail}`} style={{width: '100px'}}/>
                            <div>{item.detail.mainText}</div>
                        </Col>
                        <Col span={3}>
                            ₫{item.detail.price}
                        </Col>
                        <Col span={5} style={{justifyContent: "center"}}>
                            <InputNumber defaultValue={item.quantity} onChange={(value) => onChange(value, item)} min={1} max={item.detail.quantity}/>
                        </Col>
                        <Col span={4} style={{color: 'red'}}>
                            ₫{item.detail.price * item.quantity}
                        </Col>
                        <Col span={2} style={{justifyContent: 'center'}}>
                            <Typography.Paragraph onClick={()=> showModal(item)}>Delete</Typography.Paragraph>
                        </Col>
                        <Divider />
                    </Row>
                )
            })}
            <div style={{display:"flex", justifyContent: "end", alignItems: "center", margin: "10px"}}>
                <span style={{marginRight: "5px"}}>Total ({orderList?.length} item): </span>
                <span style={{marginRight: "10px", color: 'red'}}>₫39000</span>
                <Button type='primary' danger>Check Out</Button>
            </div>
            <Modal title="Detele" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                Sure
            </Modal>
        </>
    )
};

export default Order;
