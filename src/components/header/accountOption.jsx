import {Dropdown, Space} from "antd";

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
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    My Purchase
                </a>
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
