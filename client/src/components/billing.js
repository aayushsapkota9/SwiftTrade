import React, { useState, useEffect, useRef } from 'react';
import { Table, Tabs, Steps, Tag, Space, AutoComplete } from 'antd';
import * as Yup from 'yup';
import CustomForm from './custom_form';

const Billing = () => {
    const SubBilling = () => {


        const BillingHeaders = () => {
            const [current, setCurrent] = useState(0);
            const [options, setOptions] = useState([])
            const onChange = (value) => {
                console.log('onChange:', value);
                setCurrent(value);
            };
            const addInvoiceSchema = {
                name: Yup.string()
                    .min(2, 'Too Short!')
                    .max(50, 'Too Long!')
                    .required('Required'),
                address: Yup.string()
                    .min(2, 'Too Short!')
                    .max(50, 'Too Long!'),
                contact: Yup.string()
            }
            const addInvoiceFields = [
                {
                    label: 'Customer\'s Name *',
                    labelClass: '',
                    name: 'name',
                    placeholder: `Enter the customer's name`,
                    className: '"border-gray-600 bg-gray-100 border-2 rounded-md p-1 w-96 ',

                },
                {
                    label: 'Address',
                    labelClass: '',
                    name: 'address',
                    placeholder: `Enter customer's address`,
                    className: '"border-gray-600 bg-gray-100 border-2 rounded-md p-1 w-96 ',

                },
                {
                    label: 'Contact Info',
                    labelClass: '',
                    name: 'contact',
                    placeholder: `Enter email or phone number`,
                    className: '"border-gray-600 bg-gray-100	border-2 rounded-md p-1 w-96',

                },
            ]
            const addInvoiceInitials = {
                name: '',
                address: '',
                contact: '',

            }

            return (
                <div>
                    <Steps
                        type="navigation"
                        current={current}
                        onChange={onChange}
                        className="site-navigation-steps"
                        items={[
                            {
                                status: 'create',
                                title: 'Create Invoice',
                            },
                            {
                                status: 'send',
                                title: 'Send Invoice',
                            },
                            {
                                status: 'receive',
                                title: 'Receive Payment',
                            },
                        ]}
                    />
                    <div>
                        <CustomForm

                            schema={addInvoiceSchema}
                            parentClass={" flex gap-24 mt-10"}
                            errorClass={'flex flex-col gap-3 '}
                            initialValues={addInvoiceInitials}
                            fields={addInvoiceFields}
                        ></CustomForm>
                    </div>
                    <hr className='mt-8'></hr>
                    <div className='flex'>
                    </div>
                </div>
            );
        };
        const BillingTable = () => {
            const [options, setOptions] = useState([])
            const [currentItem, setCurrentItem] = useState()
            const [billItem, setBillItem] = useState([{
                key: '',
                name: '',
                price: '',
                quantity: '',
            },
            ])
            const fetchInventoryDetails = async (page = 1, size = 10) => {
                //used to get inventory list details
                const res = await fetch(`http://localhost:4000/inventory/all-items?page=${page}&size=${size}`)
                const data = await res.json()
                const inventoryListDestructured = []
                data.inventoryList.forEach((item) => {
                    const { _id, ...otherFields } = item
                    otherFields.key = _id
                    inventoryListDestructured.push(
                        otherFields,
                    )
                })
                setOptions(inventoryListDestructured.map((item) => {
                    return { value: item.name, _id: item.key, sellingPrice: item.sellingPrice }
                }))
            }
            // const fetchBillDetails = async (_id) => {
            //     const res = await fetch(`http://localhost:4000/inventory/item/64e4f09c3315d71cd8814af6`)
            //     const data = await res.json()
            //     const tempData = billData
            //     setBillData([data.item, ...billData])
            //     console.log(billData)

            // }
            useEffect(() => {
                fetchInventoryDetails()
            }, [])

            const addItemToBill = () => {
                setBillItem([...billItem, {
                    key: '',
                    name: '',
                    price: '',
                    quantity: '',
                },])

            }
            const fillUpDetails = (name, otherFields) => {
                const temp = {
                    key: otherFields._id,
                    name: name,
                    sellingPrice: otherFields.sellingPrice,
                    quantity: 1,
                }
                setCurrentItem(temp)
            }
            const columns = [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    render: (e) => <AutoComplete
                        onSelect={fillUpDetails}
                        backfill={true}
                        style={{
                            width: 200,
                        }}
                        options={options}
                        placeholder="Product's name"
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    />,
                },
                {
                    title: 'Quantity',
                    dataIndex: 'quantity',
                    key: 'quantity',
                },
                {
                    title: 'Price',
                    dataIndex: 'sellingPrice',
                    key: 'sellingPrice',
                },

                {
                    title: 'Total',
                    dataIndex: 'total',
                    key: 'total',
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (_, record) => (
                        <Space size="middle">
                            <a>Invite {JSON.stringify(currentItem)}</a>
                            <a>Delete </a>
                        </Space>
                    ),
                },
            ];
            return (
                <div>
                    <Table columns={columns} dataSource={billItem} pagination={false} />
                    <div><button className='border-black border-2 px-10 py-3 bg-black text-white' onClick={addItemToBill}>Add new Item</button></div>
                </div>
            )
        }
        return <div>
            <BillingHeaders></BillingHeaders>
            <BillingTable></BillingTable>

        </div>
    }

    //tabs
    const initialTabItems = [
        {
            label: 'Tab 1',
            children: <SubBilling></SubBilling>,
            key: '1',
            closable: false,
        },
    ]
    const [activeTabKey, setactiveTabKey] = useState(initialTabItems[0].key);
    const [items, setItems] = useState(initialTabItems);
    const newTabIndex = useRef(0);
    const onChange = (newactiveTabKey) => {
        setactiveTabKey(newactiveTabKey);
    };
    const onTabEdit = (targetKey, action) => {
        const remove = (targetKey) => {
            let newactiveTabKey = activeTabKey;
            let lastIndex = -1;
            items.forEach((item, i) => {
                if (item.key === targetKey) {
                    lastIndex = i - 1;
                }
            });
            const newPanes = items.filter((item) => item.key !== targetKey);
            if (newPanes.length && newactiveTabKey === targetKey) {
                if (lastIndex >= 0) {
                    newactiveTabKey = newPanes[lastIndex].key;
                } else {
                    newactiveTabKey = newPanes[0].key;
                }
            }
            setItems(newPanes);
            setactiveTabKey(newactiveTabKey);
        };
        const add = () => {
            const newactiveTabKey = `newTab${newTabIndex.current++}`;
            console.log(newactiveTabKey)
            const newPanes = [...items];
            newPanes.push({
                label: 'New Tab',
                children: <SubBilling></SubBilling>,
                key: newactiveTabKey,
            });
            setItems(newPanes);
            setactiveTabKey(newactiveTabKey);
        };

        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };
    //tabs
    return (
        <Tabs
            type="editable-card"
            onChange={onChange}
            activeTabKey={activeTabKey}
            onEdit={onTabEdit}
            items={items}
        />
    );

}


export default Billing