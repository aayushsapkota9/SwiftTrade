import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import React, { Component, Fragment } from 'react';
import { PDFViewer } from '@react-pdf/renderer'
import Invoice from './Bill_Pdf';
const SendInvoice = (props) => {
    const { billDetails, customerDetails } = useSelector(state => state.bills.tabKey)
    const today = new Date()
    const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
    console.log(date)
    const invoiceData = {
        id: "5df3180a09ea16dc4b95f910",
        invoice_no: "201906-28",
        balance: "$2,283.74",
        company: customerDetails.name,
        email: customerDetails.contact,
        // phone: customerDetails.contact,
        address: customerDetails.address,
        trans_date: date,
        // due_date: "2019-10-12",
        items: billDetails.map((item, index) => {
            return {
                sno: index,
                desc: item.value,
                qty: parseInt(item.quantity),
                rate: item.price

            }
        }),

    };
    // const { customerDetails, billItems } = useSelector(state => state.bills)
    return (
        <div className=''>
            <div>
                <Fragment>
                    <PDFViewer width="1000" height="600" className="app" >
                        <Invoice invoice={invoiceData} />
                    </PDFViewer>
                </Fragment>
            </div>

        </div>
    )
}

export default SendInvoice