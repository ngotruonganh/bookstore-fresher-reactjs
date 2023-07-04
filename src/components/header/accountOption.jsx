import {Dropdown, Space} from "antd";
import {Link} from "react-router-dom";

const AccountOption = () => {
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    My Account
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <Link to='/order-history'>
                    My Purchase
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    Logout
                </a>
            ),
        },
    ];
    return (
        <Dropdown
            menu={{
                items,
            }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space style={{color: "white"}}>
                    ngotruonganhhhhh
                </Space>
            </a>
        </Dropdown>
    );
};

export default AccountOption;
