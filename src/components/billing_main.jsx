import React, { useContext, useEffect, useState } from 'react'
import ItemContext from '../context/itemContext';
import Item from './item';

export default function Billing_main() {
  const itemContext = useContext(ItemContext);
  const {getItems,items} = itemContext;
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    getItems();
  }, []);
  
  const totalPriceFunc = (total) =>{
    setTotalPrice(totalPrice+total);
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
        return <Item key={item._id} totalPriceFunc={totalPriceFunc} item={item} />
      }) : 'No items Found!!'}
      </div>
      <div className="totalPriceDiv">
              <div className="totalPricec"><h6>Total Price : </h6><p>{totalPrice}</p></div>
              <button className='btn btn-primary p-1 my-2 mx-3'>Make Bill &#8594;</button>
            </div>
        </div>
      </div>
      <div className="contentAllInvoice" id="panel-2" role="tabpanel" tabIndex="0" aria-labelledby="tab-2" hidden>this</div>
    </div>
  )
}
