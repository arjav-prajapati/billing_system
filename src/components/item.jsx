import React, { useContext, useEffect, useState } from 'react'
import ItemContext from '../context/itemContext';

export default function Item(props) {
  const { item } = props;
  const itemContext = useContext(ItemContext);
  const { handleMinus, handlePlus } = itemContext;

  const [totalPricePerItem, setTotalPricePerItem] = useState({});
  const [itemToPurchasePerItem, setItemToPurchasePerItem] = useState({});
  const [itemQTY, setItemQTY] = useState({});

  useEffect(() => {
    setTotalPricePerItem({ ...totalPricePerItem, [item._id]: 0 });
    setItemToPurchasePerItem({ ...itemToPurchasePerItem, [item._id]: 0 });
    setItemQTY({ ...itemQTY, [item._id]: item.itemStock });
  }, []);


  const handleClickMinus = (e) => {
    if (itemToPurchasePerItem[item._id] !== 0) {
      setItemQTY({ ...itemQTY, [item._id]: ++itemQTY[item._id] });
      setItemToPurchasePerItem({ ...itemToPurchasePerItem, [item._id]: --itemToPurchasePerItem[item._id] });
      setTotalPricePerItem({...totalPricePerItem,[item._id]:totalPricePerItem[item._id]-item.itemPrice});
      // setItemQTY({...itemQTY,[item._id]:--itemQTY[item._id]});
      handleMinus(item._id, itemToPurchasePerItem[item._id], itemQTY[item._id],item.itemPrice);
    }else{
      alert("Item cannot be less than zero!!");
    }
  }

  const handleClickPlus = (e) => {
    if (itemQTY[item._id] !== 0) {
      setItemToPurchasePerItem({ ...itemToPurchasePerItem, [item._id]: ++itemToPurchasePerItem[item._id] });
      setTotalPricePerItem({...totalPricePerItem,[item._id]:totalPricePerItem[item._id]+item.itemPrice});
      setItemQTY({...itemQTY,[item._id]:--itemQTY[item._id]});
      handlePlus(item._id, itemToPurchasePerItem[item._id], itemQTY[item._id],item.itemPrice);
    }else{
      alert("Item out of Stock!!");
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
