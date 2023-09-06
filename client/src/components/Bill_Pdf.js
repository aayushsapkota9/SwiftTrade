import React, { Fragment } from 'react';
import { Page, Document, Image, StyleSheet, Text, View } from '@react-pdf/renderer';
import logo from '../../public/swift-logo-black.png'


const Invoice = ({ invoice }) => {
    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Helvetica',
            fontSize: 11,
            paddingTop: 30,
            paddingLeft: 60,
            paddingRight: 60,
            lineHeight: 1.5,
            flexDirection: 'column',
        },
        logo: {
            width: 74,
            height: 66,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    });
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image style={styles.logo} src={logo} />
                <InvoiceTitle title='Invoice' />
                <InvoiceNo invoice={invoice} />
                <BillTo invoice={invoice} />
                <InvoiceItemsTable invoice={invoice} />
                <InvoiceThankYouMsg />
            </Page>
        </Document>
    )
};
const InvoiceTitle = ({ title }) => {
    const styles = StyleSheet.create({

        titleContainer: {
            flexDirection: 'row',
            marginTop: 24,
        },
        reportTitle: {
            color: '#61dafb',
            letterSpacing: 4,
            fontSize: 25,
            textAlign: 'center',
            textTransform: 'uppercase',
        }
    });

    return (<View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title}</Text>
    </View>)

};
const InvoiceNo = ({ invoice }) => {
    const styles = StyleSheet.create({
        invoiceNoContainer: {
            flexDirection: 'row',
            marginTop: 36,
            justifyContent: 'flex-end'
        },
        invoiceDateContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
        },
        label: {
            width: 60
        }

    });
    return (<Fragment>
        <View style={styles.invoiceNoContainer}>
            <Text style={styles.label}>Invoice No:</Text>
            <Text style={styles.invoiceDate}>{invoice.invoice_no}</Text>
        </View >
        <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Date: </Text>
            <Text >{invoice.trans_date}</Text>
        </View >
    </Fragment>)
};
const BillTo = ({ invoice }) => {
    const styles = StyleSheet.create({
        headerContainer: {
            marginTop: 36
        },
        billTo: {
            marginTop: 20,
            paddingBottom: 3,
            fontFamily: 'Helvetica-Oblique'
        },
    });

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.billTo}>Bill To:</Text>
            <Text>{invoice.company}</Text>
            <Text>{invoice.address}</Text>
            <Text>{invoice.phone}</Text>
            <Text>{invoice.email}</Text>
        </View>
    )
};
const InvoiceItemsTable = ({ invoice }) => {
    const tableRowsCount = 11;

    const styles = StyleSheet.create({
        tableContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 24,
            borderWidth: 1,
            borderColor: '#bff0fd',
        },
    });
    return (
        <View style={styles.tableContainer}>
            <InvoiceTableHeader />
            <InvoiceTableRow items={invoice.items} />
            <InvoiceTableBlankSpace rowsCount={tableRowsCount - invoice.items.length} />
            <InvoiceTableFooter items={invoice.items} />
        </View>
    )
};
const InvoiceThankYouMsg = () => {
    const styles = StyleSheet.create({

        titleContainer: {
            flexDirection: 'row',
            marginTop: 12
        },
        reportTitle: {
            fontSize: 12,
            textAlign: 'center',
            textTransform: 'uppercase',
        }
    });

    return (
        <View style={styles.titleContainer}>
            <Text style={styles.reportTitle}>Thank you for your business</Text>
        </View>
    )
};
const InvoiceTableHeader = () => {
    const borderColor = '#90e5fc'
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            borderBottomColor: '#bff0fd',
            backgroundColor: '#bff0fd',
            borderBottomWidth: 1,
            alignItems: 'center',
            height: 24,
            textAlign: 'center',
            fontStyle: 'bold',
            flexGrow: 1,
        },
        description: {
            width: '60%',
            borderRightColor: borderColor,
            borderRightWidth: 1,
        },
        qty: {
            width: '10%',
            borderRightColor: borderColor,
            borderRightWidth: 1,
        },
        rate: {
            width: '15%',
            borderRightColor: borderColor,
            borderRightWidth: 1,
        },
        amount: {
            width: '15%'
        },
    });
    return (
        <View style={styles.container}>
            <Text style={styles.description}>Item Description</Text>
            <Text style={styles.qty}>Qty</Text>
            <Text style={styles.rate}>@</Text>
            <Text style={styles.amount}>Amount</Text>
        </View>
    )
};
const InvoiceTableRow = ({ items }) => {
    const borderColor = '#90e5fc'
    const styles = StyleSheet.create({
        row: {
            flexDirection: 'row',
            borderBottomColor: '#bff0fd',
            borderBottomWidth: 1,
            alignItems: 'center',
            height: 24,
            fontStyle: 'bold',
        },
        description: {
            width: '60%',
            textAlign: 'left',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            paddingLeft: 8,
        },
        qty: {
            width: '10%',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            textAlign: 'right',
            paddingRight: 8,
        },
        rate: {
            width: '15%',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            textAlign: 'right',
            paddingRight: 8,
        },
        amount: {
            width: '15%',
            textAlign: 'right',
            paddingRight: 8,
        },
    });

    const rows = items.map(item =>
        <View style={styles.row} key={item.sno.toString()}>
            <Text style={styles.description}>{item.desc}</Text>
            <Text style={styles.qty}>{item.qty}</Text>
            <Text style={styles.rate}>{item.rate}</Text>
            <Text style={styles.amount}>{(item.qty * item.rate).toFixed(2)}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};
const InvoiceTableBlankSpace = ({ rowsCount }) => {
    const borderColor = '#90e5fc'
    const styles = StyleSheet.create({
        row: {
            flexDirection: 'row',
            borderBottomColor: '#bff0fd',
            borderBottomWidth: 1,
            alignItems: 'center',
            height: 24,
            fontStyle: 'bold',
            color: 'white'
        },
        description: {
            width: '60%',
            borderRightColor: borderColor,
            borderRightWidth: 1,
        },
        qty: {
            width: '10%',
            borderRightColor: borderColor,
            borderRightWidth: 1,
        },
        rate: {
            width: '15%',
            borderRightColor: borderColor,
            borderRightWidth: 1,
        },
        amount: {
            width: '15%',
        },

    });
    const blankRows = Array(rowsCount).fill(0)
    const rows = blankRows.map((x, i) =>
        <View style={styles.row} key={`BR${i}`}>
            <Text style={styles.description}>-</Text>
            <Text style={styles.qty}>-</Text>
            <Text style={styles.rate}>-</Text>
            <Text style={styles.amount}>-</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};
const InvoiceTableFooter = ({ items }) => {
    const borderColor = '#90e5fc'
    const styles = StyleSheet.create({
        row: {
            flexDirection: 'row',
            borderBottomColor: '#bff0fd',
            borderBottomWidth: 1,
            alignItems: 'center',
            height: 24,
            fontSize: 12,
            fontStyle: 'bold',
        },
        description: {
            width: '85%',
            textAlign: 'right',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            paddingRight: 8,
        },
        total: {
            width: '15%',
            textAlign: 'right',
            paddingRight: 8,
        },
    });


    const total = items.map(item => item.qty * item.rate)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return (
        <View style={styles.row}>
            <Text style={styles.description}>TOTAL</Text>
            <Text style={styles.total}>{Number.parseFloat(total).toFixed(2)}</Text>
        </View>
    )
};
export default Invoice