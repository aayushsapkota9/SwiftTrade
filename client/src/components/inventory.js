import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Button, Modal, message, Table, Pagination, Popconfirm, Image } from 'antd';
import CustomFrom from './custom_form';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


const Inventory = () => {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const showModal = () => {
        setIsAddProductModalOpen(true);
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
        } else {
            messageApi.info(resData.msg);
        }
    };
    const editInventory = async (values) => {
        const data = new FormData();
        const { image, ...otherFields } = values;
        Object.keys(otherFields).forEach((item) => {
            data.append(item, otherFields[item])
        })
        image ? data.append('image', image) : data.append('image', currentInventoryItem.image)
        data.append('_id', currentInventoryItem.key)
        const res = await fetch(`http://localhost:4000/inventory/items/${currentInventoryItem.key}`, {
            method: 'PUT',
            body: data
        });
        const resData = await res.json();
        if (resData && res.status == 200) {
            messageApi.info(resData.msg);
            setIsEditModalOpen(false);
        } else {
            messageApi.info(resData.msg);
        }
    };
    const [messageApi, contextHolder] = message.useMessage();
    const [inventoryList, setInventoryList] = useState([])
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [totalCount, setTotalCount] = useState(0)
    const [currentInventoryItem, setCurrentInventoryItem] = useState({})
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
            render: (value) => {
                return (<div className='flex gap-5 '><EditOutlined onClick={() => {
                    setCurrentInventoryItem(value)
                    setIsEditModalOpen(true);
                }} />
                    <Popconfirm
                        title="Delete item"
                        description="Are you sure to delete the item?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined danger onClick={() => {
                            setCurrentInventoryItem(value)
                        }}>Delete</DeleteOutlined>
                    </Popconfirm>
                    {contextHolder}
                </div >)
            }
        },
    ];
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
        setTotalCount(data.count)
    }
    useEffect(() => {
        fetchInventoryDetails()
    }, [])
    const data = inventoryList;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const handleCancel = () => {
        setIsAddProductModalOpen(false);
        setIsEditModalOpen(false)
    }
    const addInventorySchema = {
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
    }
    const addInventoryFields = [{
        label: 'Name',
        labelClass: '',
        name: 'name',
        placeholder: `Enter the product's name`,
        className: '"border-gray-600 bg-gray-100	border-2 rounded-md p-1 w-96',

    },
    {
        label: 'Category',
        labelClass: '',
        name: 'category',
        placeholder: `Enter the product's category`,
        className: '"border-gray-600 bg-gray-100	border-2 rounded-md p-1 w-96',

    },
    {
        label: 'Purchase Price',
        labelClass: '',
        name: 'purchasePrice',
        placeholder: `Amount`,
        className: '"border-gray-600 bg-gray-100	border-2 rounded-md p-1 w-96',

    },
    {
        label: 'Selling Price',
        labelClass: '',
        name: 'sellingPrice',
        placeholder: `Amount`,
        className: '"border-gray-600 bg-gray-100	border-2 rounded-md p-1 w-96',

    },
    ]
    const addInventoryInitials = {
        name: '',
        category: '',
        sellingPrice: '',
        purchasePrice: '',
        image: ''
    }
    const editInventoryInitials = {
        name: currentInventoryItem.name,
        category: currentInventoryItem.category,
        sellingPrice: currentInventoryItem.sellingPrice,
        purchasePrice: currentInventoryItem.purchasePrice,
        image: currentInventoryItem.image
    }
    const confirm = async () => {
        const res = await fetch(`http://localhost:4000/inventory/items/${currentInventoryItem.key}`, {
            method: 'DELETE',
            body: data
        });
        const resData = await res.json();
        if (resData && res.status == 200) {
            messageApi.info(resData.msg);
        } else {
            messageApi.info(resData.msg);
        }
    };
    const cancel = (e) => {

    };


    return <div>
        <div className='flex justify-between mb-10 mt-2'>
            <div className='text-4xl'>Items</div>
            <div> <>
                <Button onClick={showModal}>
                    Add Inventory
                </Button>
                <Modal title="Add Item" open={isAddProductModalOpen} footer={null} onCancel={handleCancel}>
                    <div>
                        {contextHolder}
                        <CustomFrom
                            schema={addInventorySchema}
                            parentClass={" flex flex-col gap-5"}
                            submitClass={"bg-gray-800 rounded-md text-white px-5 py-2 w-32 flex justify-center "}
                            submitText={"Add Item"}
                            errorClass={'flex gap-3'}
                            initialValues={addInventoryInitials}
                            fields={addInventoryFields}
                            onSubmit={addInventory}
                            imageLabel={"Upload photo"}
                        ></CustomFrom>
                    </div>
                </Modal>
            </></div>
        </div>
        <hr ></hr>
        <div>
            <div>
                <div style={{ marginBottom: 16, }}>
                    <span style={{ marginLeft: 8, }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />

                <Modal title="Edit Item" open={isEditModalOpen} onCancel={handleCancel} footer={false} width={1000} >
                    <div className='flex gap-10'>
                        <div>
                            {contextHolder}
                            <CustomFrom
                                schema={addInventorySchema}
                                parentClass={" flex flex-col gap-5"}
                                submitClass={"bg-gray-800 rounded-md text-white px-5 py-2 w-32 flex justify-center"}
                                submitText={"Edit Item"}
                                errorClass={'flex gap-3'}
                                initialValues={editInventoryInitials}
                                fields={addInventoryFields}
                                onSubmit={editInventory}
                                imageLabel={"Change Image"}
                            ></CustomFrom>
                        </div>
                        <div>
                            <Image
                                width={500}
                                src={`http://localhost:4000/inventory/item-image/${currentInventoryItem.key}`}
                            />
                            {JSON.stringify(currentInventoryItem)}
                            {JSON.stringify(editInventoryInitials)}
                        </div>
                    </div>
                </Modal>
                <Pagination onChange={(page, size) => fetchInventoryDetails(page, size)} defaultCurrent={1} total={totalCount} showSizeChanger />
            </div>
        </div>
    </div >
}



export default Inventory;
