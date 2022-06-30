import React, { useContext, useEffect, useRef} from 'react'
import ItemContext from '../context/itemContext';
import Item from './item';
import ReactToPrint from 'react-to-print';
import BillingItems from './billingItems';
import InvoiceContext from '../context/invoiceContext';
import InvoiceComponent from './invoiceComponent';

export default function BillingMain() {
  const itemContext = useContext(ItemContext);
  const { getItems, items, backendFunc, totalPrice, itemToPurchasePerItem, totalPricePerItem, saveInvoiceBackend} = itemContext;
  const invoiceContext = useContext(InvoiceContext);
  const {getInvoices,invoices} = invoiceContext;
  const componentPrint = useRef('');

  useEffect(() => {
    getItems();
    getInvoices();
  }, []);


  // const totalPriceFunc = (total,id,itemPrice,itemToPurchase) => {
  //   setTotalPrice(totalPrice + total);
  //   // console.log(totalBuying);
  //   console.log(id + ' ' +itemPrice + ' ' + itemToPurchase);
  //   // totalBuyingItems([...totalBuyingItems,id:])
  //   totalBuyingItems(...totalBuyingItems,{[totalBuyingItems]:{_id:id,itemName:items[id].itemName,itemPrice,itemToPurchase}})
  // }

  const getTotalItems = (e) => {
    backendFunc();
  }

  const saveInvoice = () =>{
    saveInvoiceBackend();
  }

  function changeTabs(e) {
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;
    // console.log(grandparent);
    // Remove all current selected tabs
    parent
      .querySelectorAll('[aria-selected="true"]').forEach(element => {
        element.setAttribute('aria-selected', false);
        element.style.color = '#7c7c7c';
        element.style.borderBottom = 'none';
      });

    // Set this tab as selected
    target.setAttribute('aria-selected', true);

    // Hide all tab panels
    grandparent.parentNode
      .querySelectorAll('[role="tabpanel"]')
      .forEach(p => p.setAttribute('hidden', true));

    // Show the selected panel
    grandparent.parentNode
      .querySelector(`#${target.getAttribute('aria-controls')}`)
      .removeAttribute('hidden');

    if (target.getAttribute('aria-selected') === 'true') {
      target.style.color = 'black';
      target.style.borderBottom = '2px solid #4f45d3';
    }
  }


  return (
    <div className='main'>
      <div className='leftHamburgerMain'>
        <div className="leftHamburger" role="tablist" aria-label="Sample Tabs" onClick={changeTabs}>
          <button role="tab" className="leftHamburgera btn btn-primary" aria-selected="true" aria-controls="panel-1" id="tab-1" tabIndex="0" >Home</button>
        </div>
        <div className="leftHamburger" role="tablist" aria-label="Sample Tabs" onClick={changeTabs}>
          <button role="tab" className="leftHamburgera btn btn-primary" aria-selected="true" aria-controls="panel-2" id="tab-2" tabIndex="0">Show all Invoice</button>
        </div>
      </div>

      <div className="contentHome" id="panel-1" role="tabpanel" tabIndex="0" aria-labelledby="tab-1">
        <div className="itemlist">
          <div className="item">
            <table>
              <tr>
                <th className="itemName">Item</th>
                <th className="itemTotalQTY">ItemQTY</th>
                <th className='my-1 mx-2' id='itemPlusButton'></th>
                <th className='Purchase'>Item To Purchase</th>
                <th className='my-1 mx-2' id='itemMinusButton'></th>
                <th className="itemPrice">Item Price</th>
                <td className='finished'></td>
                <td className="tilde"></td>
                <th className="totalPrice">Total Price</th>
              </tr>
            </table>
            <hr />
            {items !== '' && items !== null && items.length !== 0 ? items.map((item) => {
              return <Item key={item._id} item={item} />
            }) : 'No items Found!!'}
          </div>
          <div className="totalPriceDiv">
            <div className="totalPricec"><h6>Total Price : </h6><p>{totalPrice}</p></div>
            <button onClick={saveInvoiceBackend}>This</button>
            {/* This is for printing bill */}
            <ReactToPrint
              trigger={() => {
                return <button className='btn btn-primary p-1 my-2 mx-3'>Make Bill &#8594;</button>
              }}
              content={() => componentPrint.current}
              documentTitle='Bill'
              pageStyle="print"
              onBeforePrint={getTotalItems}
              onAfterPrint={saveInvoice}
            />

          </div>
          <div className="Bill">
            <div ref={componentPrint}>
              <table>
                <tr>
                  <th className="itemNameBill">Item Name</th>
                  <th className="itemTotalQTYBill">Item Quantity</th>
                  <th className="itemPriceBill">Purcahsing Price per unit</th>
                  <th className="totalPriceBill">Total Price per Item</th>
                </tr>
                {items !== '' && items !== null && items.length !== 0 ? items.map((item) => {
                  if (itemToPurchasePerItem[item._id]) {
                    return <BillingItems key={item._id} item={item} itemToPurchase={itemToPurchasePerItem[item._id]} totalPricePerItem={totalPricePerItem[item._id]} />
                  }else{
                    return '';
                  }
                }) : 'No items Found!!'}
              </table>
              <div className="totalPriceDivBill">
                <div className="totalPricecBill"><h6>Total Price : </h6><p>{totalPrice}</p></div>
              </div>
            </div>
          </div>
        </div>
                
      </div >
      <div className="contentAllInvoice" id="panel-2" role="tabpanel" tabIndex="0" aria-labelledby="tab-2" hidden>
          <div className="invoiceList">
          {invoices.length !== 0 && invoices!==undefined?invoices.map((invoice)=>{
            return <InvoiceComponent key={invoice._id} invoice={invoice}/>
          }):"No Invoices Found!!"}
          </div>
      </div>

    </div >
  )
}
