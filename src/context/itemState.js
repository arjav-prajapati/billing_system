import React, { useState } from "react";
import ItemContext from "./itemContext";


const ItemState = (props) =>{
    const [items, setItems] = useState('');
    const host = "http://localhost:5400";

    const getItems = async() =>{
        const result = await fetch(`${host}/api/stocks/fetchItems`,{
            method:'GET',
            headers:{
                'content-Type' : 'application/json'
            },
        });

        const json = await result.json();
        if(json.success){
            setItems(json.obj);
        }else{
            alert('Some error occured!');
        }
    }

    return(
        <ItemContext.Provider value={{getItems,items,setItems}}>
            {props.children}
        </ItemContext.Provider>
    );
}

export default ItemState;