import { useState,useEffect } from "react";

function Cart({items}) {
  return (
    <div className="Cart">
      {items.map((item) => 
        <div className="Item" key={item.id}>
          <img src = {item.imageURL} />
          <div className="ItemInfo">
            <nav>{item.title}</nav>
            <nav>
              {item.count}x <span style={{fontWeight:"bold"}}>${Number(item.price).toFixed(2)}</span>
            </nav>
            <nav>Size: {item.size}</nav>
          </div>
        </div>
      )}
    </div>
  );

}

export default Cart