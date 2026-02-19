import { useState,useEffect } from "react"
import Cart from "./Cart";

function Product() {
  const [cart, setCart] =  useState("My Cart");
  const [imgUrl, setImgUrl] =  useState();
  const [title, setTitle] =  useState("");
  const [price, setPrice] =  useState(0);
  const [discription, setDiscription] =  useState("");
  const [selected, setSelected] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizes, setSizes] =  useState([]);
  const [errorMsg, setErroMsg] =  useState("");
  const [showCart, setShowCart] = useState(false);
  const [items, setItems] = useState([]);

  const selectSize = (select)=>{
    setSelected(select);
    setSelectedSize(select);

  }

  const setData = (data) => {
    setImgUrl(data.imageURL);
    setTitle(data.title);
    setPrice(data.price);
    setDiscription(data.description);

    const labels = data.sizeOptions.map((s) => s.label);
    setSizes(labels);
  }

  const addtoCart = () => {
    if (selected == null) {
      setErroMsg("please selcect a size");
      return;
    }
    setErroMsg("");
    // console.log(selectedSize);

    const newItem = {
      id: Date.now(), // or real product id
      imageURL: imgUrl,
      title,
      price,
      size: selected,
    };

    setItems((prevItems) => {
      // check if same size already exists
      const existItem = prevItems.find((i) => i.size === selectedSize);
      if (existItem) {
        // increment count
        return prevItems.map((i) =>
          i.size === selectedSize
            ? { ...i, count: i.count + 1 }
            : i
        );
      } else {
        return [...prevItems, { ...newItem, count: 1 }];
      }
    });
  }

  const fetchData = async () => {
    try {
      console.log("fetch");
      const response = await fetch("https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product");
      // console.log("Status:", response.status);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); 
      console.log(data);
      setData(data);
    } catch (err) {
      console.log(err.message);
    } 
  }

  useEffect(() => {
    fetchData();
  }, []);

  return(
    <>
      <div>
        <header>
          <div className="MyCart" onClick={()=>setShowCart(!showCart)}>
            {cart}
          </div>
        </header>

        {showCart&&(
          <Cart items={items}></Cart>)
        }
        <div className="Product">
          <div className="Left">
            <img src={imgUrl}/>
          </div>
          
          <div className="Right">
            <div className="Title">{title}</div>
            <div className="Price">${Number(price).toFixed(2)}</div>
            <div className="Description">{discription}</div>

            <div className = "Size">
              <span style={{ color: "gray" }}>SIZE</span>
              <span style={{ color: "red" }}>* </span>
              <span style={{color: "black"}}>{selectedSize}</span>
            </div>

            <div className = "SizeLabels">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={()=>selectSize(size)}
                  className={selected === size ? "selected" : ""}
                >
                  {size}
                </button>
              ))}
            </div>

            <button className="AddButton" onClick={addtoCart}>ADD TO CART</button>
            <div className="ErrorMsg">{errorMsg}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product