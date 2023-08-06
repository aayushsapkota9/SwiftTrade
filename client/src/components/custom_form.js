import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';



const CustomFrom = (props) => {
    const SignupSchema = Yup.object().shape(props.schema);
    console.log(props.fields)
    return < div >
        <Formik
            initialValues={props.initialValues}
            validationSchema={SignupSchema}
            onSubmit={values => {
                props.onSubmit(values)
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
                    <div className={props.submitClass}><button type="submit" >Submit</button></div>
                </Form>
            )}
        </Formik>
    </div >
};
export default CustomFrom;