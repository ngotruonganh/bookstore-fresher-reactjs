import {Select, Space} from "antd";

const Language = () => {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <Space wrap>
            <Select
                defaultValue="en"
                style={{
                    width: 120,
                }}
                bordered={false}
                onChange={handleChange}
                options={[
                    {
                        value: 'en',
                        label: 'English',
                    },
                    {
                        value: 'vn',
                        label: 'Tiếng Việt',
                    }
                ]}
            />
        </Space>
    );
};

export default Language;
