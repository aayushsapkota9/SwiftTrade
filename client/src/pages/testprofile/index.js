// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Card, Modal } from 'antd';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';

// const SignupSchema = Yup.object().shape({
//     currentPassword: Yup.string()
//         .min(2, 'Too Short!')
//         .max(50, 'Too Long!')
//         .required('Required'),
//     newPassword: Yup.string()
//         .min(2, 'Too Short!')
//         .max(50, 'Too Long!')
//         .required('Required'),
//     confirmNewPassword: Yup.string()
//         .min(2, 'Too Short!')
//         .max(50, 'Too Long!')
//         .required('Required')
//         .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
// });

// const ChangePassForm = () => {
//     return (
//         <div>
//             <Formik
//                 initialValues={{
//                     currentPassword: '',
//                     newPassword: '',
//                     confirmNewPassword: '',
//                 }}
//                 validationSchema={SignupSchema}
//                 onSubmit={values => {
//                     // same shape as initial values
//                     console.log(values);
//                 }}
//             >
//                 {({ errors, touched }) => (
//                     <Form className='flex flex-col gap-3'>
//                         <div className=''><label className='block'>Current Password</label>
//                             <Field name="currentPassword" className="border-2 border-gray-400 w-64" />
//                             {errors.currentPassword && touched.currentPassword ? (
//                                 <div className='text-red-600'>{errors.currentPassword}</div>
//                             ) : null}</div>
//                         <div className=''>
//                             <label className='block'>New Password</label ><Field name="newPassword" className="border-2 border-gray-400 w-64" />
//                             {errors.newPassword && touched.newPassword ? (
//                                 <div className='text-red-600'>{errors.newPassword}</div>
//                             ) : null}</div>
//                         <div className=''>
//                             <label className='block'>Confirm New Password</label><Field name="confirmNewPassword" type="confirmNewPassword" className="border-2 border-gray-400 w-64 " />
//                             {errors.confirmNewPassword && touched.confirmNewPassword ? <div className='text-red-600'>{errors.confirmNewPassword}</div> : null}</div>

//                         <button type="submit" className='bg-green-600 text-white px-7 rounded py-2'>Change Password</button>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     )
// }
// const Profile = () => {
//     const { userDetails } = useSelector(state => state.users)
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const handleSubmit = () => {
//         alert("submit to backend")
//     }
//     return (
//         <Card title="Your Profile">
//             <Card type="inner" title="User Details" extra={<a href="#">Edit</a>}>
//                 Full Name: {userDetails.fullName} <br />
//                 Email: {userDetails.email} <br />
//                 Phone: {userDetails.phoneNumber} <br />
//                 mode: {userDetails.mode}<br />
//             </Card>
//             <Card
//                 style={{
//                     marginTop: 16,
//                 }}
//                 title="Security"
//                 extra={<a href="#">More</a>}
//             >
//                 <span onClick={() => setIsModalOpen(true)} className='text-blue-600 underline  hover:cursor-pointer'>Change Password </span><br />
//                 Delete Account
//             </Card>
//             <Modal
//                 footer={null}
//                 title="Change Password" open={isModalOpen} onOk={handleSubmit} onCancel={() => setIsModalOpen(false)} >
//                 <ChangePassForm />
//             </Modal>
//         </Card>
//     )
// };
// export default Profile;