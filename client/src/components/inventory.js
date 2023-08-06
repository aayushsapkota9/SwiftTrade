import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Modal } from 'antd';


const Inventory = () => {
    const SignupSchema = Yup.object().shape({
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
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return <div>
        <div className='flex justify-between mb-10 mt-2'>
            <div className='text-4xl'>Items</div>
            <div> <>
                <Button onClick={showModal}>
                    Add Inventory
                </Button>
                <Modal title="Basic Modal" open={isModalOpen} footer={null} onCancel={handleCancel}>
                    <div>
                        <h1>Signup</h1>
                        <Formik
                            initialValues={{
                                name: '',
                                category: '',
                                sellingPrice: '',
                                purchasePrice: '',
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={values => {
                                // same shape as initial values
                                console.log(values);
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className='flex flex-col gap-5'>
                                    <div>Name:<Field name="name" className="border-black border-2" />
                                        {errors.name && touched.name ? (
                                            <div>{errors.name}</div>
                                        ) : null}</div>
                                    <div>Category<Field name="category" className="border-black border-2" />
                                        {errors.category && touched.category ? (
                                            <div>{errors.category}</div>
                                        ) : null}</div>
                                    <div>Selling Price<Field name="purchasePrice" className="border-black border-2" />
                                        {errors.purchasePrice && touched.purchasePrice ? (
                                            <div>{errors.purchasePrice}</div>
                                        ) : null}</div>
                                    <div>Selling Price<Field name="sellingPrice" className="border-black border-2" />
                                        {errors.sellingPrice && touched.sellingPrice ? (
                                            <div>{errors.sellingPrice}</div>
                                        ) : null}</div>
                                    <button type="submit" className='bg-gray-800 px-5 py-2 text-white'>Submit</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Modal>
            </></div>
        </div>
        <hr ></hr>
        <div>
        </div>
    </div>
}


export default Inventory;