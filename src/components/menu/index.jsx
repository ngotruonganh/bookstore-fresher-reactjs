import {Menu} from 'antd';
import {BookOutlined, HomeOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";
import {Link} from "react-router-dom";

const items = [
    {
        icon: <HomeOutlined />,
        label: <Link to='/admin'>Dashboard</Link>,
        key: 'dashboard',
    },
    {
        icon: <UserOutlined />,
        label: <Link to='/admin/user'>Manage users</Link>,
        key: 'users',
    },
    {
        icon: <BookOutlined />,
        label: <Link to='/admin/book'>Manage books</Link>,
        key: 'books',
    },
];

const MenuAdmin = () => {
    const [current, setCurrent] = useState(['dashboard']);
    const onClick = (e) => {
        setCurrent(e.key);
    };
    return (
        <Menu
            onClick={onClick}
            style={{
                width: '100%',
            }}
            defaultSelectedKeys={current}
            mode="inline"
            items={items}
        />
    );
};
export default MenuAdmin;