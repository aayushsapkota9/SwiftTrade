import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
const SendInvoice = (props) => {
    const { customerDetails, billItems } = useSelector(state => state.bills)
    return (
        <div>
            {JSON.stringify(customerDetails, billItems)}
            {props.tabKey}
        </div>
    )
}

export default SendInvoice