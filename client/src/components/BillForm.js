import React, { useState, useEffect } from 'react'
import * as Yup from 'yup';
import { Table, Tabs, Steps, Tag, Space, AutoComplete } from 'antd';
import CustomForm from './custom_form';
const BillingHeaders = (props) => {

    const [options, setOptions] = useState([])
    const onChange = (value) => {
        console.log('onChange:', value);
        props.setCurrent(value);
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
                current={props.current}
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
            <div><CustomForm
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
            return { value: item.name, key: item.key, price: item.sellingPrice }
        }))
    }
    useEffect(() => {
        fetchInventoryDetails()
    }, [])

    const addItemToBill = () => {
        setCurrentItem()
        setBillItem([...billItem, {
            key: '',
            name: '',
            price: '',
            quantity: '',
        }])

    }
    const fillUpDetails = (id, currentBillItem, index) => {
        let oldBillItems = [...billItem]
        currentBillItem.quantity = 1
        currentBillItem.total = currentBillItem.price * currentBillItem.quantity
        oldBillItems[index] = currentBillItem
        setBillItem(oldBillItems)
        setCurrentItem(currentBillItem)
    }
    const setQuantity = (quantity, currentBillItem, index) => {
        let oldBillItems = [...billItem]
        currentBillItem.quantity = quantity.target.value
        currentBillItem.total = currentBillItem.price * currentBillItem.quantity
        oldBillItems[index] = currentBillItem
        setBillItem(oldBillItems)
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (id, record, index) => <div><AutoComplete
                onSelect={(id, record) => fillUpDetails(id, record, index)}
                backfill={true}
                style={{
                    width: 200,
                }}
                options={options}
                placeholder="Product's name"
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                defaultValue={currentItem}
            /></div>
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (id, record, index) => {
                return <div>
                    {billItem[index].price ? <input onChange={(id) => setQuantity(id, record, index)} className='border-2 border-gray-200 rounded-md w-16  ' ></input> : null}
                </div>
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
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
                    <div className='hover:text-blue-400 hover:cursor-pointer'>Delete </div>
                </Space>
            ),
        },
    ];
    const [totalBill, setTotalBill] = useState(0)
    useEffect(() => {
        setTotalBill(billItem.reduce((accumator, item) => {
            const currentItemPrice = item.price ? item.price : 0
            return accumator += currentItemPrice
        }, 0))
    }, billItem)

    const tableSummary = () => (
        <Table.Summary fixed>
            <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                    <div className=' relative left-[450px]'>
                        {JSON.stringify(totalBill)}
                    </div>
                </Table.Summary.Cell>
            </Table.Summary.Row>
        </Table.Summary>
    )
    return (
        <div>
            <Table columns={columns} dataSource={billItem} pagination={false} summary={tableSummary} />
            <div className='flex justify-between '><button className='border-black border-2 px-10 py-3 bg-black text-white' onClick={addItemToBill}>Add new Item</button>
                <button className='border-black border-2 px-10 py-3 bg-black text-white mr-16' >Send Invoice</button>
            </div>
            <div>{JSON.stringify(billItem)}</div>
        </div>
    )
}
const BillForm = () => {
    const [current, setCurrent] = useState(0);

    return <div>
        <>
            <BillingHeaders current={current} setCurrent={setCurrent}></BillingHeaders>
            <BillingTable></BillingTable></>
    </div>
}

export default BillForm