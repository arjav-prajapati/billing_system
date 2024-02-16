import React, { useState } from "react";
import ItemContext from "./itemContext";


const ItemState = (props) => {
    const [items, setItems] = useState('');
    const host = "http://localhost:5400";
    const [totalPricePerItem, setTotalPricePerItem] = useState({});
    const [itemToPurchasePerItem, setItemToPurchasePerItem] = useState({});
    const [itemQTY, setItemQTY] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const getItems = async () => {
        const result = await fetch(`${host}/api/stocks/fetchItems`, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json'
            },
        });

        const json = await result.json();
        if (json.success) {
            setItems(json.obj);
        } else {
            alert('Some error occured!');
        }
    }


    const handlePlus = (id, itemToPurchasePerItemP, itemQTYP, itemPrice) => {
        setItemQTY({ ...itemQTY, [id]: itemQTYP });
        setTotalPricePerItem({ ...totalPricePerItem, [id]: itemToPurchasePerItemP * itemPrice });
        setItemToPurchasePerItem({ ...itemToPurchasePerItem, [id]: itemToPurchasePerItemP });
        setTotalPrice(totalPrice + itemPrice);
    }

    const handleMinus = (id, itemToPurchasePerItemP, itemQTYP, itemPrice) => {
        setItemQTY({ ...itemQTY, [id]: itemQTYP });
        setTotalPricePerItem({ ...totalPricePerItem, [id]: itemToPurchasePerItemP * itemPrice });
        setItemToPurchasePerItem({ ...itemToPurchasePerItem, [id]: itemToPurchasePerItemP });
        setTotalPrice(totalPrice - itemPrice);
    }

    const backendFunc = () => {
        if (window.confirm('Are you sure you want to Make a bill??')) {
            const obj = [];
            let number = 0;
            for (let index = 0; index < items.length; index++) {
                const item = items[index];
                if (itemToPurchasePerItem[item._id] !== undefined && itemToPurchasePerItem[item._id] !== null && itemToPurchasePerItem[item._id] !== '') {
                    obj[number] = { id: item._id, itemName: item.itemName, qty: itemToPurchasePerItem[item._id], itemPrice: totalPricePerItem[item._id] }
                    number++;
                }
            }
            return obj;
            // saveInvoiceBackend(totalItemsToBuy);
        }else{
            return null;
        }
    }




    return (
        <ItemContext.Provider value={{ getItems, items, setItems, itemQTY, itemToPurchasePerItem, totalPricePerItem, handlePlus, handleMinus, backendFunc, totalPrice}}>
            {props.children}
        </ItemContext.Provider>
    );
}

export default ItemState;