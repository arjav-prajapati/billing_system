import React, { useEffect, useState } from 'react'

export default function Item(props) {
  const { item } = props;
  const [totalPricePerItem, setTotalPricePerItem] = useState({});
  const [itemToPurchasePerItem, setItemToPurchasePerItem] = useState({});
  const [itemQTY, setItemQTY] = useState({});

  useEffect(() => {
    setTotalPricePerItem({ ...totalPricePerItem, [item._id]: 0 });
    setItemToPurchasePerItem({ ...itemToPurchasePerItem, [item._id]: 0 });
    setItemQTY({ ...itemQTY, [item._id]: item.itemStock });
  }, []);


  const handleClickMinus = (e) => {
    for (const key in itemToPurchasePerItem) {
      if (Object.hasOwnProperty.call(itemToPurchasePerItem, key)) {
        let element = itemToPurchasePerItem[key];
        if (element === 0) {
          alert('Sorry item cannot less than zero!!')
        }
        else {
          setItemToPurchasePerItem({ ...itemToPurchasePerItem, [item._id]: --element });
          const totalPrice = element * item.itemPrice;
          setTotalPricePerItem({ ...totalPricePerItem, [item._id]: totalPrice });
          setItemQTY({ ...itemQTY, [item._id]: ++itemQTY[item._id] });
          props.totalPriceFunc(-item.itemPrice);
        }
      }
    }
  }

  const handleClickPlus = (e) => {
    for (const key in itemToPurchasePerItem) {
      if (Object.hasOwnProperty.call(itemToPurchasePerItem, key)) {
        let element = itemToPurchasePerItem[key];
        if (itemQTY[item._id] === 0) {
          alert('Sorry product is out of Stock!!');
        } else {
          setItemToPurchasePerItem({ ...itemToPurchasePerItem, [item._id]: ++element });
          const totalPrice = element * item.itemPrice;
          setTotalPricePerItem({ ...totalPricePerItem, [item._id]: totalPrice });
          setItemQTY({ ...itemQTY, [item._id]: --itemQTY[item._id] });
          props.totalPriceFunc(item.itemPrice);
        }
      }
    }
  }


  return (
    <>
      <table>
        <tr>
          <td className="itemName">{item.itemName}</td>
          <td className="itemTotalQTY">{Object.hasOwnProperty.call(itemQTY, item._id) ? itemQTY[item._id] : ''}</td>
          <td className='btn btn-primary my-1 mx-2' id='itemPlusButton' onClick={() => handleClickPlus(item._id)}>&#43;</td>
          <td className="itemQTY"><div><i>{Object.hasOwnProperty.call(itemToPurchasePerItem, item._id) ? itemToPurchasePerItem[item._id] : ''}</i></div></td>
          <td className='btn btn-primary my-1 mx-2' id='itemMinusButton' onClick={() => handleClickMinus(item._id)}>&minus;</td>
          <td className="itemPrice">{item.itemPrice}</td >
          <td className='finished'><i>{item.finished === true ? "Finished" : ""}</i></td>
          <td className="tilde">&sim;</td>
          <td className="totalPrice">{Object.hasOwnProperty.call(totalPricePerItem, item._id) ? totalPricePerItem[item._id] : ''}</td>
        </tr>
      </table>
    </>

  )
}
