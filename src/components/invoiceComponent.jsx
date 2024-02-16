import React from 'react'
import next from '../Assets/next.png';
import InvoiceDetails from './invoiceDetailsComponent';

function InvoiceComponent(props) {
    const { invoice } = props;

    const showDetails = (e, id) => {
        if (e.target.checked) {
            document.getElementById(id).style.display = "block";
        } else {
            document.getElementById(id).style.display = "none";
        }
    }

    return (
        <>
            <div className='invoice'>
                <div className="invoiceDisplay">
                    <input type="checkbox" className='btnControl' id={invoice._id} onClick={(e) => { showDetails(e, invoice.invoiceNo) }} />
                    <label className="seeMore" htmlFor={invoice._id}><img alt="" srcSet={next} /></label>
                    {/* <button className="seeMore" onClick={showDetails} ><img alt="" srcSet={next} /></button> */}
                    <div className="invoiceNo">{invoice.invoiceNo}</div>
                    <div className="invoiceNo">TotalItems</div>
                    <div className="invoiceNo">{invoice.totalPurchasedPrice
                    }</div>
                    <div className="invoiceNo">{ }</div>
                </div>
                <div className='moreDetails w3-animate-zoom' id={invoice.invoiceNo}>
                    <hr />
                    <table>
                        <tr>
                            <th>Item Name</th>  
                            <th>Item Bought</th>
                            <th>Item Price</th>
                            <th>~</th>
                            <th>Total Price/item</th>
                        </tr>
                        {invoice.itemPurchased !== null && invoice.itemPurchased !== undefined && invoice.itemPurchased !== '' ? invoice.itemPurchased.map((item) => { return <InvoiceDetails key={item.id} item={item} /> }) : 'No Invoices Details Found!!'}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td style={{borderTop:'1px dashed black',display:'flex',justifyContent:'center',alignItems:'center'}}><h6>Total Price : </h6><p style={{padding:'15px 0 0 3px'}}>{invoice.totalPurchasedPrice} &#x20B9;</p></td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}
export default InvoiceComponent;
