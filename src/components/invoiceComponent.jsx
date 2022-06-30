import React, { useContext } from 'react'
import next from '../Assets/next.png';
import ItemContext from '../context/itemContext';

function InvoiceComponent(props) {
    const {invoice} = props;
    const itemContext = useContext(ItemContext);
    const {items} = itemContext;

    const showDetails = (e,id) =>{
        if(e.target.checked){
            document.getElementById(id).style.display = "block";
        }else{
            document.getElementById(id).style.display = "none";
        }
    }

    return (
        <>
            <div className='invoice'>
                <div className="invoiceDisplay">
                    <input type="checkbox" className='btnControl' id={invoice._id} onClick={(e) => {showDetails(e,invoice.invoiceNo)}}/>
                    <label className="seeMore" htmlFor={invoice._id}><img alt="" srcset={next} /></label>
                    {/* <button className="seeMore" onClick={showDetails} ><img alt="" srcset={next} /></button> */}
                    <div className="invoiceNo">{invoice.invoiceNo}</div>
                    <div className="invoiceNo">TotalItems</div>
                    <div className="invoiceNo">{invoice.totalPurchasedPrice
}</div>
                    <div className="invoiceNo">{}</div>
                </div>
                <div className='moreDetails' id={invoice.invoiceNo}>
                    <hr />
                    <table>
                        <tr>
                            <th>{invoice.invoiceNo}</th>
                            <th>Item Bought</th>
                            <th>Item Price</th>
                            <th>~</th>
                            <th>Total Price</th>
                        </tr>
                        { }
                    </table>
                </div>
            </div>
        </>
    )
}
export default InvoiceComponent;
