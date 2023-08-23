import React, { useState, useEffect } from 'react';
import { Space, Table, AutoComplete, Button } from 'antd';

const BillingTable = () => {
    const [options, setOptions] = useState([])
    const setOtherFieldsDetails = (e) => {
        console.log(e)
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: () => <AutoComplete
                onSelect={(e) => setOtherFieldsDetails(e)}
                style={{
                    width: 400,

                }}
                options={options}
                placeholder="try to type `b`"
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            />,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            name: '',
            age: '',
            address: '',
        }
    ];
    const handleAdd = () => {

    }
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
            return { value: item.name }
        }))


    }
    useEffect(() => {
        fetchInventoryDetails()
    }, [])
    return <div>
        <Table columns={columns} dataSource={data} />
        <Button
            onClick={handleAdd}
            type="primary"
            style={{
                marginBottom: 16,
            }}
        >
            Add a row
        </Button>
    </div>
}
export default BillingTable;