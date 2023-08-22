import React, { useState, useEffect } from 'react';
import { Steps, AutoComplete } from 'antd';
import CustomFrom from './custom_form';
import * as Yup from 'yup';
import Inventory from './inventory';
const SubBilling = () => {
    const [current, setCurrent] = useState(0);
    const [inventoryList, setInventoryList] = useState([])
    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
    };
    const addInventory = async (values) => {
        const data = new FormData();
        const { image, ...otherFields } = values;
        Object.keys(otherFields).forEach((item) => {
            data.append(item, otherFields[item])
        })
        data.append('image', image);
        const res = await fetch('http://localhost:4000/inventory/items', {
            method: 'POST',
            body: data
        });
        const resData = await res.json();
        if (resData && res.status == 200) {
            messageApi.info(resData.msg);
            setIsAddProductModalOpen(false);
            fetchInventoryDetails();
        } else {
            messageApi.info(resData.msg);
        }
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

    const fetchInventoryDetails = async (page = 1, size = 10) => {
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
        setInventoryList(inventoryListDestructured)

    }
    useEffect(() => {
        fetchInventoryDetails()
    }, [])
    const options = inventoryList;

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
                <CustomFrom

                    schema={addInvoiceSchema}
                    parentClass={" flex gap-24 mt-10"}
                    errorClass={'flex flex-col gap-3 '}
                    initialValues={addInvoiceInitials}
                    fields={addInvoiceFields}
                ></CustomFrom>
            </div>
            <hr className='mt-8'></hr>
            <AutoComplete
                style={{
                    width: 200,
                }}
                options={options}
                placeholder="try to type `b`"
                filterOption={(inputValue, options) =>
                    options.name.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            />
            {JSON.stringify(options)}
        </div>
    );
};
export default SubBilling;
