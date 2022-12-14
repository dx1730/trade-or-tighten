import React, { useState, useContext } from "react";
import SocketContext from "../../contexts/SocketContext";

function Error({ errorMessage }) {
    return (
      <div className="text-left text-sm mt-2 font-light text-red" disabled={true}>
        &#9888; Error: {errorMessage}
      </div>
    )
  }
  
function OrderForm(props) {
    const [orderType, setOrderType] = useState(-1);
    const [isBuySide, setBuySide] = useState(-1);
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { socket } = useContext(SocketContext);
  
    const handleOrderTypeChange = (event) => {
      switch (event.target.value) {
        case "Limit":
          setOrderType(true);
          break;
        case "Market":
          setOrderType(false);
          break;
        default:
          setOrderType(-1);
      }
    };
  
    const handleBuySideChange = (event) => {
      switch (event.target.value) {
        case "Buy":
          setBuySide(true);
          break;
        case "Sell":
          setBuySide(false);
          break;
        default:
          setBuySide(-1);
      }
    };
  
    const attemptSendTrade = async () => {
      // data validation
      let priceNum = Number(price);
      let quantityNum = Number(quantity);
  
      if (orderType === -1 || isBuySide === -1) {
        setError(true);
        setErrorMessage("Please make sure you have selected a buy/sell side and an order type.");
        return;
      }
  
      if (isNaN(priceNum) || price === "" || priceNum < 0 || priceNum > 9999) {
        setError(true);
        setErrorMessage("Please make sure your price is valid.");
        return;
      }
  
      if (isNaN(quantityNum) || quantity === "") {
        setError(true);
        setErrorMessage("Please make sure your quantity is a valid number.");
        return;
      } else if (quantityNum <= 0) {
        setError(true);
        setErrorMessage("Please make sure your quantity is greater than 0.");
        return;
      } else if (!Number.isInteger(quantityNum)) {
        setError(true);
        setErrorMessage("Quantity must be a whole number.");
        return;
      }
  
      // data works, send to server
      setError(false);
      let orderData = {
        room: props.room,
        username: props.username,
        isBuySide: isBuySide,
        price: orderType ? Math.round((priceNum + Number.EPSILON) * 100) / 100 : 9999,
        quantity: Math.round(quantityNum) 
      }
      console.log(orderData);

      await socket.emit("send_order", orderData);
    };
  
  
    return (
      <section className="bg-indigo-100 h-full">
        <div className="pt-4 mx-auto max-w-7xl px-8 text-center flex-initial">
          <div className="mx-auto w-3/4 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-8">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-800">
                Make A Trade
              </h1>
              <div className="mt-6 space-y-6">
                <div className="w-full flex">
                  <select className={`block appearance-none border w-1/2 border-gray-300 text-gray-800 py-3 px-4 mr-2 rounded leading-tight focus:outline-none focus:border-indigo-600
                    ${isBuySide === true ? 'bg-green-100 text-green-800' : isBuySide === false ? 'bg-red-100 text-red-800' : 'bg-gray-50'}`} 
                    id="buy-sell"
                    defaultValue="Buy/Sell"
                    onChange={handleBuySideChange}
                    >
                      <option value="Buy/Sell" disabled>Buy/Sell</option>
                      <option value="Buy">Buy</option>
                      <option value="Sell">Sell</option>
                  </select>
                  <select className="block appearance-none bg-gray-50 border w-1/2 border-gray-300 text-gray-800 py-3 px-4 ml-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" 
                  id="order-type"
                  defaultValue="Order Type"
                  onChange={handleOrderTypeChange}>
                    <option value="Order Type" disabled>Order Type</option>
                    <option value="Limit">Limit</option>
                    <option value="Market">Market</option>
                  </select>
                </div>
                <div className="w-full flex">
                  <div className="w-1/2 mr-2">
                    <label htmlFor="price" className="text-left block mb-2 text-sm font-medium text-gray-800">Price</label>
                    <input
                      disabled={orderType === false}
                      value={orderType === false ? "" : price}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5" 
                      placeholder={orderType === false ? "----" : "Price"}
                      onChange={(event) => {setPrice(event.target.value)}}
                      onKeyDown={(event) => {event.key === 'Enter' && attemptSendTrade()}}
                    />
                  </div>
                  <div className="w-1/2 ml-2">
                    <label htmlFor="quantity" className="text-left block mb-2 text-sm font-medium text-gray-800">Quantity</label>
                    <input 
                      placeholder="Quantity"
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-800 focus:ring-indigo-600 focus:border-indigo-600 text-sm rounded-lg block w-full p-2.5" 
                      onChange={(event) => {setQuantity(event.target.value)}}
                      onKeyDown={(event) => {event.key === 'Enter' && attemptSendTrade()}}
                    />
                  </div>
                </div>
              </div>
              { error ? <Error errorMessage={errorMessage}/> : null }
              <button
                className="w-full mt-6 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus-outline-none focus:ring-indigo-300 font-medium rounded-lg px-5 py-2.5 text-center"
                onClick={attemptSendTrade}
                >
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
    )
}

export default OrderForm;