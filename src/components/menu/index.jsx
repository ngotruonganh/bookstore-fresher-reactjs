import {AppstoreOutlined, MailOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Users', 'sub1', <MailOutlined />, [
        getItem('Manage Users', '1'),
        getItem('Option 2', '2'),
    ]),
    getItem('Books', 'sub2', <AppstoreOutlined />, [
        getItem('manage Books', '3'),
        getItem('Option 2', '4'),
    ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2'];
const MenuAdmin = () => {
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    return (
        <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{
                width: 256,
            }}
            items={items}
        />
    );
};
export default MenuAdmin;