import React, { useState } from 'react'
import InvoiceContext from './invoiceContext'

export default function InvoiceState(props) {
    const [invoices, setInvoices] = useState('');
    const host = 'http://localhost:5400';

    //taking previous invoices
    const getInvoices = async() =>{
        const result = await fetch(`${host}/api/invoice/invoices`, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json'
            },
        });

        const json = await result.json();
        if (json.success) {
            setInvoices(json.obj);
        } else {
            alert('Some error occured!');
        }
    } 


    const saveInvoiceBackend = async (totalItemsToBuyP,totalPrice) => {

        const result = await fetch(`${host}/api/invoice/bill`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                "custName": "Arjav",
                "itemPurchased": totalItemsToBuyP,
                "totalPurchasedPrice": totalPrice
            })
        });

        const json = await result.json();
        if (json.success) {
            setInvoices(json.obj);
        } else {
            alert('Some error occured!',json);
        }
    }
  return (
    <InvoiceContext.Provider value={{getInvoices,invoices,setInvoices,saveInvoiceBackend}}>
        {props.children}
    </InvoiceContext.Provider>
  )
}
