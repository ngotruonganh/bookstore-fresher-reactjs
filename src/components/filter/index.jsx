import { Checkbox } from 'antd';
const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
};
const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
    {
        label: 'Apple',
        value: 'Apple',
    },
    {
        label: 'Pear',
        value: 'Pear',
    },
    {
        label: 'Orange',
        value: 'Orange',
    },
];
const optionsWithDisabled = [
    {
        label: 'Apple',
        value: 'Apple',
    },
    {
        label: 'Pear',
        value: 'Pear',
    },
    {
        label: 'Orange',
        value: 'Orange',
        disabled: false,
    },
];
const Filter = () => (
    <>
        <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
        <br />
        <br />
        <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
        <br />
        <br />
        <Checkbox.Group
            options={optionsWithDisabled}
            disabled
            defaultValue={['Apple']}
            onChange={onChange}
        />
    </>
);
export default Filter;