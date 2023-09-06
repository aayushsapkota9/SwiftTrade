import React, { useState, useEffect } from 'react'
import * as Yup from 'yup';
import { Table, Tabs, Steps, Tag, Space, AutoComplete } from 'antd';
import CustomForm from './custom_form';
import SendInvoice from './SendInvoice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { setBillItems } from '@/redux/reducerSlice/billSlice';
const Bill = (props) => {
    const billDetails = useSelector(state => state.bills)
    const dispatch = useDispatch()
    const [options, setOptions] = useState([])
    const [currentItem, setCurrentItem] = useState()
    const [billItem, setBillItem] = useState([{
        key: '',
        name: '',
        price: '',
        quantity: '',
    },
    ])
    const [totalBillAmount, setTotalBillAmount] = useState(0)
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        address: '',
        contact: ''
    })
    const fetchInventoryDetails = async (page = 1, size = 10) => {
        //used to get inventory list details for autocomplete
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

    const addEmptyBillRow = () => {
        setCurrentItem()
        if (billItem[billItem.length - 1].price) {
            setBillItem([...billItem, {
                key: '',
                name: '',
                price: '',
                quantity: '',
            }])
        }
    }
    const fillUpCorrespondingRow = (id, currentBillItem, index) => {
        //autocomplete
        let oldBillItems = [...billItem]
        currentBillItem.quantity = 1
        currentBillItem.total = currentBillItem.price * currentBillItem.quantity
        oldBillItems[index] = currentBillItem
        setBillItem(oldBillItems)
        setCurrentItem(currentBillItem)
    }
    const setQuantity = (quantity, currentBillItem, index) => {
        let oldBillItems = [...billItem]
        let copyCurrentBillItem = { ...currentBillItem }
        copyCurrentBillItem.quantity = quantity.target.value
        copyCurrentBillItem.total = copyCurrentBillItem.price * copyCurrentBillItem.quantity
        oldBillItems[index] = copyCurrentBillItem
        setBillItem(oldBillItems)
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            className: 'w-96',
            key: 'name',
            render: (id, record, index) => <div><AutoComplete
                onSelect={(id, record) => fillUpCorrespondingRow(id, record, index)}
                backfill={true}
                style={{
                    width: 400,
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
                    {billItem[index].price ? <input onChange={(id) => setQuantity(id, record, index)} className='border-2 border-gray-200 rounded-md w-16 text-center ' ></input> : null}
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
                    <div className='hover:text-red-400 hover:cursor-pointer'>Delete </div>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        setTotalBillAmount(billItem.reduce((accumulator, item) => {
            const currentItemPrice = item.total ? item.total : 0
            return accumulator += currentItemPrice
        }, 0))
    }, [billItem])
    useEffect(() => {
        if (billItem[billItem.length - 1].price > 0) {
            dispatch(setBillItems({
                customerDetails: customerDetails,
                billDetails: billItem,
                tabKey: props.tabKey
            }))
        }
    }, [props.current, billItem])


    const tableSummary = () => (
        <Table.Summary fixed>
            <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                    <div className=' relative left-[450px]'>
                        {JSON.stringify(totalBillAmount)}
                    </div>
                </Table.Summary.Cell>
            </Table.Summary.Row>
        </Table.Summary>
    )
    const customerFieldSchema = {
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        address: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),
        contact: Yup.string()
    }
    const customerInvoiceFields = [
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
    const customerInvoiceInitials = {
        name: '',
        address: '',
        contact: '',

    }
    const onInputNameChange = (name, e) => {
        const details = { ...customerDetails }
        console.log(name, e.target.value)
        details[name] = e.target?.value
        setCustomerDetails(details)
    }

    return (
        <div>
            <CustomForm
                schema={customerFieldSchema}
                parentClass={" flex gap-24 m-16 "}
                errorClass={'flex flex-col gap-3 '}
                initialValues={customerInvoiceInitials}
                fields={customerInvoiceFields}
                onBlur={onInputNameChange}
            ></CustomForm>
            <Table columns={columns} dataSource={billItem} pagination={false} summary={tableSummary} style={{
                margin: '3rem'
            }} />
            <div className='flex justify-between '><button className='border-black border-2 rounded-2xl relative left-10  px-10 py-3 bg-black text-white' onClick={addEmptyBillRow}>Add new Item</button>
            </div>
            <div className=''>{JSON.stringify(billDetails)}</div>
        </div>
    )
}
const BillForm = (props) => {
    const [current, setCurrent] = useState(0);
    const onChange = (value) => {
        // console.log('onChange:', value);
        setCurrent(value);

    };


    return <>
        <Steps
            type="navigation"
            current={current}
            onChange={onChange}
            className="site-navigation-steps "
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
        {current == 0 ? <Bill current={current} tabKey={props.tabKey}></Bill> : null}
        {current == 1 ? <SendInvoice tabKey={props.tabKey}></SendInvoice> : null}

    </>
}

export default BillForm