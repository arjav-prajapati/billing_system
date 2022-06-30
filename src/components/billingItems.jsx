import React from 'react'

export default function BillingItems(props) {
  const {item,itemToPurchase,totalPricePerItem} = props;

  return (
    <>
    <tr>
      <td>{item.itemName}</td>
      <td>{itemToPurchase}</td>
      <td>{item.itemPrice}</td>
      <td>{totalPricePerItem}</td>
    </tr>
    </>
  )
}
