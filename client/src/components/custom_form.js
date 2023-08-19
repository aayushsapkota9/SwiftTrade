import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';



const CustomFrom = (props) => {
    const [image, setImage] = useState(null);
    const SignupSchema = Yup.object().shape(props.schema);
    return < div >
        <Formik
            initialValues={props.initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values, { resetForm }) => {

                values = { ...values, image }
                props.onSubmit(values)
                resetForm();

            }}
        >
            {({ errors, touched }) => (
                <Form className={props.parentClass}>

                    {props.fields.map((item) => {
                        return <div className={props.errorClass}>
                            <label className={item.labelClass}>{item.label} </label>
                            <Field name={item.name} placeholder={item.placeholder} className={item.className} />
                            {errors[item?.name] && touched[item?.name] ? (
                                <div className='text-red-600'>{errors[item?.name]}</div>
                            ) : null}
                        </div>
                    })}
                    <div>
                        {props.imageLabel ? <label>{props.imageLabel} </label> : null}
                        {props.imageLabel ? <input type='file' name='image' onChange={(e) => setImage(e.target.files[0])} /> : null}
                    </div>
                    <div className={props.submitClass}><button type="submit" >Submit</button></div>
                </Form>
            )}
        </Formik>
    </div >
};
export default CustomFrom;