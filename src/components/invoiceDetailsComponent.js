import React from 'react'

export default function InvoiceDetails(props) {
  const {item} = props;

  return (
    <>
    <tr>
      <td>{item.itemName}</td>
      <td>{item.qty}</td>
      <td>{item.itemPrice}</td>
      <td></td>
      <td>{item.itemPrice*item.qty}</td>
    </tr>
    </>
  )
}
