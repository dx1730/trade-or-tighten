import React, { useState, useContext, useEffect, useReducer } from "react";
import SocketContext from "../../contexts/SocketContext";

const formatNumber = (arg) => {
  return new Intl.NumberFormat('en-US').format(arg);
};

const formatPrice = (arg) => {
  return arg.toLocaleString("en-US", { useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2 });
};


function PriceLevelRow({total, size, price}) {
  return (
    <div className="flex justify-around	bg-gray-300 relative">
        <>
          <span className='price'>{price}</span>
          <span>{size}</span>
          <span>{total}</span>
        </>
    </div>
  );
}

{/* <div className="mt-0.5 mb-0.5">
  <PriceLevelRow total={val.name} size={val.age} price={val.gender} />
</div> */}

const reducer = ({ tradePrice, tradePriceIncrease }, newTradePrice) => {
  if (tradePrice !== -1) {
    return {
      tradePrice: newTradePrice,
      tradePriceIncrease: newTradePrice > tradePrice ? 1 : (newTradePrice < tradePrice ? 0 : -1)
    }
  } else {
    return {
      tradePrice: newTradePrice,
      tradePriceIncrease: -1
    }
  }
}

function OrderBook(props) {
  const [bids, setBids] = useState({});
  const [asks, setAsks] = useState({});
  // const [lastPrice, setLastPrice] = useState(-1);
  // const [priceIncrease, setPriceIncrease] = useState(-1);
  const [{ tradePrice, tradePriceIncrease }, dispatch] = useReducer(reducer, {
    tradePrice: -1,
    tradePriceIncrease: -1
  })
  const [spread, setSpread] = useState(-1);
  const { socket } = useContext(SocketContext);

  // setting state in useEffect --- issue with lastPrice

  useEffect(() => {
    socket.on("level_change", ({isBuySide, price, volume}) => {
      console.log(`level_change received.`);
      if (isBuySide) {
        if (volume <= 0) {
          setBids((bids) => {
            const newBids = {...bids};
            delete newBids[price];
            return newBids;
          });
        } else {
          setBids((bids) => ({...bids, [price]: volume}));
        }
      } else {
        if (volume <= 0) {
          setAsks((asks) => {
            const newAsks = {...asks};
            delete newAsks[price];
            return newAsks;
          });
        } else {
          setAsks((asks) => ({...asks, [price]: volume}));
        }
      }
    });

    socket.on("spread_change", (newSpread) => {
      console.log(`spread_change received.`);
      setSpread(newSpread);
    });

    socket.on("trade_change", (newPrice) => {
      console.log(`trade_change received.`);
      dispatch(newPrice);
    });

    return () => {
      socket.off("level_change");
      socket.off("spread_change");
      socket.off("trade_change");
    };
  }, []);

  // issue with buying being strings so sorting is happening incorrectly

  const buildPriceLevels = (levels, isBid) => {
    let priceLevels = Object.keys(levels);
    let total = 0;
    let sortedLevels = isBid ? priceLevels.sort().reverse() : priceLevels.sort();

    if (sortedLevels.length < 10) {
      let rv = sortedLevels.map((level) => {
        total = total + levels[level];
        return (
          <tr key={isBid ? level : -1 * level}>
            <td>{formatPrice(Number(level))}</td>
            <td>{formatNumber(levels[level])}</td>
            <td>{formatNumber(total)}</td>
          </tr>
        )}
      );

      for (let i = 0; i < 10 - sortedLevels.length; i++) {
        rv.push(
          <tr key={i}>
            <td colSpan="3" className="h-[18px]"></td>
          </tr>
        )
      }

      return isBid ? rv : rv.reverse();
    } else {
      sortedLevels = sortedLevels.slice(0, 10);
      return (
        sortedLevels.map((level) => {
          total = total + levels[level];
          return (
            <tr key={isBid ? level : -1 * level}>
              <td>{formatPrice(level)}</td>
              <td>{formatNumber(levels[level])}</td>
              <td>{formatNumber(total)}</td>
            </tr>
          )}
        )
      )
    }
  }

  // {bids.map((val, key) => {
  //   return (
  //     <tr key={key}>
  //       <td>{val.name}</td>
  //       <td>{val.age}</td>
  //       <td>{val.gender}</td>
  //     </tr>
  //   )
  // })}

  return (
    <div className="w-full display-flex items-center">
      <table className="w-full text-xs text-center">
        <tbody>
          <tr className="text-base">
            <th>Price</th>
            <th>Volume</th>
            <th>Total</th>
          </tr>
          {buildPriceLevels(asks, false)}
          <tr className="text-base text-center">
            <th colSpan="3">
              <span className={tradePriceIncrease === 1 ? "text-green-500" : 
                (tradePriceIncrease === 0 ? "text-red-500" : "")}>
                Last Trade: {tradePrice === -1 ? "" : formatPrice(Number(tradePrice))} &emsp; &emsp;
              </span>
              <span>Spread: {spread === -1 ? "" : formatPrice(Number(spread))}</span>
            </th>
          </tr>
          {buildPriceLevels(bids, true)}
        </tbody>
      </table>
    </div>
  );
}

export default OrderBook;