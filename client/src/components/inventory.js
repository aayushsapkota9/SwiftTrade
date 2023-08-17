import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Button, Modal, message, Table, Pagination } from 'antd';
import CustomFrom from './custom_form';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


const Inventory = () => {
    const [isAddProductModalOpen, setisAddProductModalOpen] = useState(false);
    const showModal = () => {
        setisAddProductModalOpen(true);
    };
    const onSubmit = async (values) => {
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
            setisAddProductModalOpen(false);
        } else {
            messageApi.info(resData.msg);
        }
    };
    const handleCancel = () => {
        setisAddProductModalOpen(false);
    };
    const [messageApi, contextHolder] = message.useMessage();


    return <div>
        <div className='flex justify-between mb-10 mt-2'>

            <div className='text-4xl'>Items</div>
            <div> <>
                <Button onClick={showModal}>
                    Add Inventory
                </Button>
                <Modal title="Basic Modal" open={isAddProductModalOpen} footer={null} onCancel={handleCancel}>
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
const InventoryTable = () => {
    const [inventoryList, setInventoryList] = useState([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [totalCount, setTotalCount] = useState(0)
    const columns = [
        {
            title: 'SN',
            dataIndex: 'index',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Purchase Price',
            dataIndex: 'purchasePrice',
        },
        {
            title: 'Selling Price',
            dataIndex: 'sellingPrice',
        },
        {
            title: 'Actions',
            render: () => <div className='flex gap-5 '><EditOutlined onClick={showEditModal} /><DeleteOutlined onClick={showDeleteModal} /></div>
        },
    ];
    const fetchInventoryDetails = async (page = 1, size = 10) => {
        console.log(page, size)
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
        setTotalCount(data.count)
    }
    useEffect(() => {
        fetchInventoryDetails()
    }, [])
    const data = inventoryList;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const showEditModal = () => {
        setIsEditModalOpen(true)
    }
    const showDeleteModal = () => {
        setIsDeleteModalOpen(true)
    }
    const handleCancel = () => {
        setIsEditModalOpen(false)
        setIsDeleteModalOpen(false)
    };
    return (
        <div>
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <span
                    style={{
                        marginLeft: 8,
                    }}
                >
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
            <Modal title="Basic Modal" open={isDeleteModalOpen} onCancel={handleCancel} footer={false}>
                <p>Delete..</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <Modal title="Basic Modal" open={isEditModalOpen} onCancel={handleCancel} footer={false}>
                <p>.Edit..</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <Pagination onChange={(page, size) => fetchUserDetails(page, size)} defaultCurrent={1} total={totalCount} showSizeChanger />
        </div>
    );
};


export default Inventory;
