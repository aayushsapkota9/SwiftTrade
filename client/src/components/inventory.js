import React, { useState } from 'react';
import * as Yup from 'yup';
import { Button, Modal, message } from 'antd';
import CustomFrom from './custom_form';

const Inventory = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const onSubmit = async (values) => {
        console.log(values)
        setIsModalOpen(false);
        try {
            const res = await fetch('http://localhost:4000/inventory/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            const data = await res.json();

            if (data && res.status == 200) {
                messageApi.info(data.msg);
                router.push('/dashboard')
            } else {
                messageApi.info(data.msg);
            }
        } catch (error) {

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
        </div>
    </div >
}


export default Inventory;