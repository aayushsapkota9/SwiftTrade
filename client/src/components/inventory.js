import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Button, Modal, message, Table } from 'antd';
import CustomFrom from './custom_form';


const Inventory = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const onSubmit = async (values) => {
        const data = new FormData();
        // console.log(values)
        const { image, ...otherFields } = values;
        console.log(otherFields)
        Object.keys(otherFields).forEach((item) => {
            data.append(item, otherFields[item])
        })
        console.log(data)
        data.append('values', otherFields);
        data.append('image', image);
        const res = await fetch('http://localhost:4000/inventory/items', {
            method: 'POST',
            body: data
        });
        const resData = await res.json();
        if (resData && res.status == 200) {
            messageApi.info(resData.msg);
            setIsModalOpen(false);
        } else {
            messageApi.info(resData.msg);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [messageApi, contextHolder] = message.useMessage();

    return <div>
        <div className='flex justify-between mb-10 mt-2'>

            <div className='text-4xl'>Items</div>
            <div> <>
                <Button onClick={showModal}>
                    Add Inventory
                </Button>
                <Modal title="Basic Modal" open={isModalOpen} footer={null} onCancel={handleCancel}>
                    <div>
                        {contextHolder}
                        <CustomFrom
                            schema={{
                                name: Yup.string()
                                    .min(2, 'Too Short!')
                                    .max(50, 'Too Long!')
                                    .required('Required'),
                                category: Yup.string()
                                    .min(2, 'Too Short!')
                                    .max(50, 'Too Long!')
                                    .required('Required'),
                                purchasePrice: Yup.number().required('Required'),
                                sellingPrice: Yup.number().required('Required'),
                            }} parentClass={" flex flex-col gap-5"}
                            submitClass={"bg-gray-800 rounded-md text-white px-5 py-2 w-20 "}
                            errorClass={'flex gap-3'}
                            initialValues={{
                                name: '',
                                category: '',
                                sellingPrice: '',
                                purchasePrice: '',
                                image: ''
                            }}
                            fields={[{
                                label: 'Name',
                                labelClass: '',
                                name: 'name',
                                placeholder: `Enter the product's name`,
                                className: 'border-black border-2',

                            },
                            {
                                label: 'Category',
                                labelClass: '',
                                name: 'category',
                                placeholder: `Enter the product's category`,
                                className: 'border-black border-2',

                            },
                            {
                                label: 'Purchase Price',
                                labelClass: '',
                                name: 'purchasePrice',
                                placeholder: `Amount`,
                                className: 'border-black border-2',

                            },
                            {
                                label: 'Selling Price',
                                labelClass: '',
                                name: 'sellingPrice',
                                placeholder: `Amount`,
                                className: 'border-black border-2',

                            },
                            ]}
                            onSubmit={onSubmit}
                            imageLabel={"Upload photo"}
                        ></CustomFrom>
                    </div>
                </Modal>
            </></div>
        </div>
        <hr ></hr>
        <div>
            <InventoryTable ></InventoryTable>
        </div>
    </div >
}
export default Inventory;
const InventoryTable = () => {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'address',
        },
        {
            title: 'Purchase Price',
            dataIndex: 'purchasePrice',
        },
        {
            title: 'Selling Price',
            dataIndex: 'age',
        },

    ];
    const data = [];
    for (let i = 0; i < 46; i++) {
        data.push({
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>
                <span
                    style={{
                        marginLeft: 8,
                    }}
                >
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
        </div>
    );
};