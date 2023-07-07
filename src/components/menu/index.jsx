import {Menu} from 'antd';
import {Link} from "react-router-dom";
import {useState} from "react";

const items = [
    {
        label: <Link to='/admin'>Dashboard</Link>,
        key: 'dashboard',
    },
    {
        label: <Link to='/admin/user'>Manage users</Link>,
        key: 'users',
    },
    {
        label: <Link to='/admin/book'>Manage books</Link>,
        key: 'books',
    },
];

const MenuAdmin = () => {
    const [current, setCurrent] = useState('dashboard');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <Menu
            onClick={onClick}
            style={{
                width: '100%',
            }}
            defaultSelectedKeys={['dashboard']}
            mode="inline"
            items={items}
        />
    );
};
export default MenuAdmin;